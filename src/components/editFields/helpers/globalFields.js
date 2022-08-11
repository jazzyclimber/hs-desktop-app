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
    type: "object",
    key: "visibility",
    field: {
      key: "visibility",
      value: {
        controlling_field: null,
        controlling_value_regex: null,
        operator: null,
        hidden_subfields: null
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

const customGlobalFields = {
  name: {
    type: 'text',
    key: "name",
    field: {
      key: "name",
      value: ""
    }
  },
  id: {
    type: 'text',
    key: "id",
    field: {
      key: "id",
      value: ""
    }
  },
  label: {
    type: 'text',
    key: "label",
    field: {
      key: "label",
      value: ""
    }
  },
}

const globalRepeaterFields = {
  occurrence: {
    type: "object",
    key: "occurrence",
    field: {
      key: "occurrence",
      value: {
        "min": 1,
        "max": null,
        "sorting_label_field": null,
        "default": 1
      }
    }
  }
}

const extraFields = {
  alignment_direction: {
    type: "text",
    key: "alignment_direction",
    field: {
      key: "alignment_direction",
      value:""
    }
  }
}
module.exports = {
  globalFields,
  customGlobalFields,
  globalRepeaterFields,
  extraFields
}
