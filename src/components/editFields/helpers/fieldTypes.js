const fieldTypes = {
  group: {
    "type": "group",
    "name": "typography",
    "label": "Typography",
    "expanded": false,
    "children": []
  },
  alignment: {
    "name": "img_position",
    "label": "Position Image",
    "help_text": "Position the image within it's container.",
    "required": false,
    "type": "alignment",
    "default": {
      "horizontal_align": "CENTER",
      "vertical_align": "TOP",
    }
  },
  background_image: {
    "name": "bg_image",
    "label": "Background image",
    "required": false,
    "type": "backgroundimage",
    "default": {
      "src": "https://example.com/img.png",
      "background_position": "MIDDLE_CENTER",
      "background_size": "cover"
    }

  },
  gradient: {
    "name": "bg_gradient",
    "label": "Background gradient",
    "help_text": "Sets a gradient behind the content",
    "required": false,
    "type": "gradient",
    "default": {
      "colors": [{
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 1
        }
      }, {
        "color": {
          "r": 255,
          "g": 255,
          "b": 255,
          "a": 1
        }
      }],
      "side_or_corner": {
        "verticalSide": "BOTTOM",
        "horizontalSide": null
      }
    }
  },
  icon: {
    "name": "icon_field",
    "label": "Icon",
    "required": false,
    "locked": false,
    "icon_set": "fontawesome-5.14.0",
    "type": "icon",
    "default": {
      "name": "accessible-icon",
      "unicode": "f368",
      "type": "REGULAR"
    }
  },
  spacing: {
    "name": "img_spacing",
    "label": "Spacing around image",
    "required": false,
    "type": "spacing",
    "default": {
      "padding": {
        "top": {
          "value": 10,
          "units": "px"
        },
        "bottom": {
          "value": 10,
          "units": "px"
        },
        "left": {
          "value": 10,
          "units": "px"
        },
        "right": {
          "value": 10,
          "units": "px"
        }
      },
      "margin": {
        "top": {
          "value": 10,
          "units": "px"
        },
        "bottom": {
          "value": 10,
          "units": "px"
        }
      }
    }
  },
  blog: {
    "name": "default",
    "label": "Default Blog",
    "required": false,
    "locked": false,
    "type": "blog",
    "default": 1234567890
  },
  boolean: {
    "name": "default",
    "label": "Default Boolean",
    "required": false,
    "locked": false,
    "type": "boolean",
    "display": "checkbox",
    "inline_help_text": "",
    "help_text": "",
    "default": false
  },
  text_alignment: {
    "name": "heading_align",
    "label": "Heading alignment",
    "required": false,
    "type": "textalignment",
    "default": {
      "text_align": "LEFT"
    }
  },
  border: {
    "id": "styles.border",
    "name": "border",
    "label": "border",
    "required": false,
    "locked": false,
    "allow_custom_border_sides": false,
    "type": "border",
    "default": {
      "top": {
        "width": {
          "value": 1,
          "units": "px"
        },
        "opacity": 100,
        "style": "solid",
        "color": "#ffffff"
      },
      "bottom": {
        "width": {
          "value": 1,
          "units": "px"
        },
        "opacity": 100,
        "style": "solid",
        "color": "#ffffff"
      },
      "left": null,
      "right": null
    }
  },
  text: {
    "name": "default_name",
    "label": "Default Label",
    "required": false,
    "locked": false,
    "validation_regex": "",
    "allow_new_line": false,
    "show_emoji_picker": false,
    "type": "text",
    "default": ""
  },
  choice: {
    "name": "img_position",
    "label": "Image Position",
    "required": false,
    "locked": false,
    "multiple": "true",
    "display": "select",
    "choices": [
      ["option_1", "Option 1"],
      ["option_2", "Option 2"]
    ],
    "type": "choice",
    "default": "option_1"
  },
  color: {
    "name": "bg_color",
    "label": "Background color",
    "required": false,
    "locked": false,
    "type": "color",
    "default": {
      "color": "#ff0000",
      "opacity": 100
    }
  },
  cta: {
    "name": "cta",
    "label": "CTA",
    "required": false,
    "locked": false,
    "type": "cta",
    "default": null
  },
  crm_object: {
    "name": "crmobject_field",
    "label": "CRM object",
    "required": false,
    "locked": false,
    "object_type": "CONTACT",
    "properties_to_fetch": [],
    "type": "crmobject",
    "default": {
      "id": 1
    }
  },
  crm_object_property: {
    "name": "crmobjectproperty_field",
    "label": "CRM object property",
    "required": true,
    "locked": false,
    "object_type": "contact",
    "type": "crmobjectproperty",
    "default": {
      "property": "field_of_study"
    }
  },
  date: {
    "name": "event_start_date",
    "label": "Event Date",
    "required": false,
    "locked": false,
    "type": "date",
    "default": 1577854800000
  },
  date_and_time: {
    "name": "event_start",
    "label": "Event Start",
    "required": false,
    "locked": false,
    "type": "datetime",
    "default": 1577854800000
  },
  email_address: {
    "name": "emails",
    "label": "Email address",
    "required": false,
    "locked": false,
    "type": "email",
    "default": null
  },
  embed: {
    "name": "embed_field",
    "label": "Embed",
    "required": false,
    "locked": false,
    "supported_source_types": ["oembed", "html"],
    "supported_oembed_types": ["photo", "video", "link", "rich"],
    "type": "embed",
    "default": {
      "source_type": "oembed"
    }
  },
  file: {
    "name": "file_field",
    "label": "File",
    "required": false,
    "locked": false,
    "type": "file",
    "picker": "file",
    "default": null
  },
  follow_up_email: {
    "name": "followup_email",
    "label": "Followup email",
    "required": false,
    "locked": false,
    "type": "followupemail",
    "default": null
  },
  font: {
    "name": "font",
    "label": "Font",
    "required": false,
    "locked": false,
    "load_external_fonts": true,
    "type": "font",
    "default": {
      "size": 12,
      "font": "Merriweather",
      "font_set": "GOOGLE",
      "size_unit": "px",
      "color": "#000",
      "styles": {}
    },
    "visibility": {
      "hidden_subfields": {
        "font": true,
        "size": true
      }
    }
  },
  form: {
    "name": "form",
    "label": "Form",
    "required": false,
    "locked": false,
    "type": "form",
    "default": {
      "form_id": "f7110408-1935-4ed3-8a8e-293bb1c9d1ec",
      "response_type": "inline",
      "message": "Thanks for submitting the form.",
      "gotowebinar_webinar_key": null,
      "form_type": "HUBSPOT"
    }
  },
  hubdb_row: {
    "name": "hubdbrow_field",
    "label": "HubDB row",
    "required": false,
    "locked": false,
    "table_name_or_id": "3096859",
    "columns_to_fetch": ["name", "price", "desc"],
    "display_columns": ["name", "price", "desc"],
    "display_format": "%0 - %1 :::: %2",
    "type": "hubdbrow",
    "default": {
      "id": 4450468943
    }
  },
  hubdb_table: {
    "name": "recipe_table",
    "label": "Recipe Table",
    "required": false,
    "locked": false,
    "type": "hubdbtable",
    "default": 2010782
  },
  image: {
    "name": "image_field",
    "label": "Image",
    "required": false,
    "locked": false,
    "responsive": true,
    "resizable": true,
    "show_loading": false,
    "type": "image",
    "default": {
      "size_type": "exact",
      "src": "",
      "alt": "image-alt-text",
      "loading": "lazy",
      "width": 128,
      "height": 128,
      "max_width": 128,
      "max_height": 128
    }
  },
  link: {
    "name": "link",
    "label": "Link",
    "required": false,
    "locked": false,
    "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
    "type": "link",
    "show_advanced_rel_options": false,
    "default": {
      "url": {
        "content_id": null,
        "type": "EXTERNAL",
        "href": ""
      },
      "open_in_new_tab": false,
      "no_follow": false,
      "sponsored": false,
      "user_generated_content": false
    }
  },
  logo: {
    "name": "logo",
    "label": "Logo",
    "required": false,
    "locked": false,
    "type": "logo",
    "show_loading": true,
    "default": {
      "override_inherited_src": false,
      "src": null,
      "alt": null,
      "loading": "lazy"
    }
  },
  menu: {
    "name": "menu",
    "label": "Menu",
    "required": false,
    "locked": false,
    "type": "menu",
    "default": 12345678911
  },
  number: {
    "name": "number_field",
    "label": "Number",
    "required": false,
    "locked": false,
    "display": "slider",
    "min": 1,
    "max": 10,
    "step": 1,
    "type": "number",
    "prefix": "",
    "suffix": "",
    "default": null,
    "placeholder": "50"
  },
  page: {
    "name": "page_field",
    "label": "Page",
    "help_text": "Pulls data from the selected page.",
    "required": false,
    "locked": false,
    "placeholder": "Page to pull from",
    "type": "page",
    "default": null
  },
  rich_text: {
    "name": "description",
    "label": "Description",
    "required": false,
    "locked": false,
    "type": "richtext",
    "default": null
  },
  simple_menu: {
    "name": "toc_menu",
    "label": "Table of Contents",
    "required": false,
    "locked": false,
    "type": "simplemenu",
    "default": [{
      "isPublished": false,
      "pageLinkId": null,
      "pageLinkName": null,
      "isDeleted": null,
      "categoryId": null,
      "subCategory": null,
      "contentType": null,
      "state": null,
      "linkLabel": "Why is product marketing important?",
      "linkUrl": null,
      "linkParams": null,
      "linkTarget": null,
      "type": "NO_LINK",
      "children": [{
        "isPublished": false,
        "pageLinkId": null,
        "pageLinkName": null,
        "isDeleted": null,
        "categoryId": null,
        "subCategory": null,
        "contentType": null,
        "state": null,
        "linkLabel": "Product Marketing Responsibilities",
        "linkUrl": "#product-marketing-responsibilities",
        "linkParams": null,
        "linkTarget": null,
        "type": "URL_LINK",
        "children": []
      }, {
        "isPublished": false,
        "pageLinkId": null,
        "pageLinkName": null,
        "isDeleted": null,
        "categoryId": null,
        "subCategory": null,
        "contentType": null,
        "state": null,
        "linkLabel": "1. Identify the buyer personas and target audience for your product.",
        "linkUrl": "#step1",
        "linkParams": null,
        "linkTarget": null,
        "type": "URL_LINK",
        "children": []
      }, {
        "isPublished": false,
        "pageLinkId": null,
        "pageLinkName": null,
        "isDeleted": null,
        "categoryId": null,
        "subCategory": null,
        "contentType": null,
        "state": null,
        "linkLabel": "2. Successfully create, manage and carry out your product marketing strategy.",
        "linkUrl": "#step2",
        "linkParams": null,
        "linkTarget": null,
        "type": "URL_LINK",
        "children": []
      }]
    }, {
      "isPublished": false,
      "pageLinkId": null,
      "pageLinkName": null,
      "isDeleted": null,
      "categoryId": null,
      "subCategory": null,
      "contentType": null,
      "state": null,
      "linkLabel": "How HubSpot can help",
      "linkUrl": "https://hubspot.com",
      "linkParams": null,
      "linkTarget": null,
      "type": "URL_LINK",
      "children": []
    }]
  },
  tag: {
    "id": "c3395cd3-8e60-7e47-2f1b-b7ccf4d669c9",
    "name": "blog_tag",
    "label": "Blog Tag",
    "required": false,
    "locked": false,
    "tag_value": "SLUG",
    "type": "tag",
    "default": null
  },
  url: {
    "name": "url",
    "label": "URL",
    "required": false,
    "locked": false,
    "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
    "type": "url",
    "default": {
      "content_id": null,
      "href": "http://example.com",
      "type": "EXTERNAL"
    }
  },
  video: {
    "id": "ca4a319e-5b58-422e-47ac-49ce1b51b507",
    "name": "videoplayer_field",
    "label": "Video",
    "required": false,
    "locked": false,
    "type": "videoplayer",
    "show_advanced_options": false,
    "default": {
      "player_id": 32173842991,
      "height": 1224,
      "width": 1872,
      "conversion_asset": {
        "type": "CTA",
        "id": "c3e4fa03-2c69-461d-b9af-22b2fde86bc7",
        "position": "POST"
      },
      "loop_video": false,
      "mute_by_default": false,
      "autoplay": false,
      "hide_control": false
    }
  }

}

module.exports = {
  fieldTypes
}
