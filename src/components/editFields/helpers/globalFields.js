const globalFields = {
  help_text: {
    type: "text",
    key: "help_text",
    field: {
      key: "help_text",
      value: "",
    }
  },
  inline_help_text: {
    type: "text",
    key: "inline_help_text",
    field: {
      key: 'inline_help_text',
      value: ""
    }
  },
  locked: {
    type: "boolean",
    key: "locked",
    field: {
      key: "locked",
      value: false,
    }
  },
  required: {
    type: "boolean",
    key: "required",
    field: {
      key: "required",
      value: false,
    }
  },
  visibility: {
    type: "text-object",
    key: "visibility",
    field: {
      key: "visibility",
      value: {
        controlling_field: "",
        controlling_value_regex: "",
        operator: ""
      },
    },
  },
  display_width: {
    type: 'text',
    key: "display_width",
    field: {
      key: "display_width",
      value: "full_width"
    }
  }
}

module.exports = {globalFields}
