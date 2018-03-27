require 'nokogiri'

module Helper
  class ImageSize
    class << self
      def get_image_dimensions(src)
        @match_data = src.match('(_|-)(\d{1,4})x(\d.*).jpg')

        # Check wether there are dimensions in the image source or not
        if @match_data.nil?
          @dimensions = get_image_dimensions_by_img_file(src)
        else
          @dimensions = get_image_dimensions_by_img_src(@match_data)
        end
      end

      private

      # Gets the image dimensions from the definition of image size from the source (exp.: "...300x200.jpg")
      #
      def get_image_dimensions_by_img_src(match_data)
        { width: match_data[2], height: match_data[3] }
      end

      # Reads the dimensions of the image from the actual image via imagemagick
      #
      def get_image_dimensions_by_img_file(src)
        sizes = %x[ identify -ping -format '%w,%h' #{prepare_img_link_for_imagemagick(src)} ]
        size_arr = sizes.split ','

        { width: size_arr[0], height: size_arr[1] }
      end

      # The '/' in front of assets, has to be removed for the convert command. Remove first character if it is a '/'
      #
      def prepare_img_link_for_imagemagick(link)
        return link if link[0] != '/'

        return link[1..-1]
      end
    end
  end
end

module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, options, tokens)
      super
      @options = options.split(' | ')
    end

    def render(context)
      return if context.registers[:page][@options[0]].nil? && !is_link?(@options[0])

      src = context.registers[:page][@options[0]] || @options[0]
      alt = context.registers[:page][@options[1]] || @options[1]
      classes = @options[2]

      dimensions = Helper::ImageSize::get_image_dimensions(src)
      "<amp-img class='#{classes}' alt='#{alt}' src='#{src}' width='#{dimensions[:width]}' height='#{dimensions[:height]}' layout='responsive'></amp-img>"
    end

    private

    def is_link?(src)
      match_data = src.match('(jpg|png|gif)')

      !match_data.nil?
    end
  end
end

Liquid::Template.register_tag('image_tag', Jekyll::ImageTag)

module Jekyll
  class AmpConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /^\.html$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      doc = Nokogiri::HTML(content)

      doc.css('img').each do |img|
        dimensions = Helper::ImageSize::get_image_dimensions(img.attr('src'))

        img.name = "amp-img"
        img['layout'] = "responsive"
        img['width'] = dimensions[:width]
        img['height'] = dimensions[:height]
      end

      doc.to_s
    end
  end
end
