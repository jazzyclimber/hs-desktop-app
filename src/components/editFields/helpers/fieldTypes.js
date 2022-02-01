const fieldTypes = {
  blog: {
    "name" : "default",
    "label" : "Default Blog",
    "required" : false,
    "locked" : false,
    "type" : "blog",
    "default" : 1234567890
  },
  boolean: {
    "name" : "default",
    "label" : "Default Boolean",
    "required" : false,
    "locked" : false,
    "type" : "boolean",
    "display":"checkbox",
    "inline_help_text" : "",
    "help_text" : "",
    "default" : false
  },
  text: {
    "name" : "default_name",
    "label" : "Default Label",
    "required" : false,
    "locked" : false,
    "validation_regex" : "",
    "allow_new_line" : false,
    "show_emoji_picker" : false,
    "type" : "text",
    "default" : ""
  },

}

module.exports = {
  fieldTypes
}
