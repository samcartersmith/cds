<!DOCTYPE html>
<html lang="<%= htmlWebpackPlugin.options.templateParameters.locale %>">
  <head>
    <title><%= htmlWebpackPlugin.options.templateParameters.title %></title>
    <meta charset="UTF-8" />
    <%= htmlWebpackPlugin.options.templateParameters.head %>
  </head>
  <body>
    <div id="root"></div>
    <%= htmlWebpackPlugin.options.templateParameters.body %>
  </body>
</html>
