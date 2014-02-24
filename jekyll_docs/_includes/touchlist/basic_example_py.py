# python
from meetup.mustache.util import touchlistItem

itemConfigs = [{
    "itemContent": "<p>Paragraph content</p>",
}, {
    "itemContent": "<span>Span content</span>",
}, {
    "action": { "target": "#" },
    "itemContent": "<p>Paragraph with link wrap</p>",
}, {
    "itemContent": "<p>Paragraph content</p>",
    "helperText": "Helper text - this can be as long as you want. It will wrap to multiple lines.",
}]

# Build a list object to pass to touchlist/list.mustache
my_list = {
    "items": [touchlistItem.ItemConfig(item).template_model() for item in itemConfigs]
}
