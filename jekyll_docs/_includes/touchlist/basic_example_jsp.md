<%-- JSP --%>
<web:jsonPopulate>
{
    "list": {
        "itemConfigs": [{
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
    }
}
</web:jsonPopulate>

<meetstache:render key="touchList.list">
    <meetstache:param name="list" value="${list}"/>
</meetstache:render>
