# Copy the built main.css into the includes directory so that it can be used in the
# head.html with include-statement
#
Jekyll::Hooks.register :site, :post_write do
  FileUtils.cp '_site/assets/main.css', '_includes/main.css'
end
