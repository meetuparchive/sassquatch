<h2 class="section-subtitle">Segmented Touch List</h2>

<div class="doc-box">
	<ul class="touchList">
		<li class="touchList-segment">
			<h5 class="touchList-segment-header">Basic items</h5>
			<ul class="touchList-segment-content">
				{% include touchlist/basic_items.md %}
			</ul>
		</li>
		<li class="touchList-segment">
			<h5 class="touchList-segment-header">Avatar items</h5>
			<ul class="touchList-segment-content">
				{% include touchlist/avatar_items.liquid %}
			</ul>
		</li>
		{% include touchlist/segmented_example.md %}
	</ul>
</div>

<div class="j-code">
	{% highlight html %}{% include touchlist/segmented_example.md %}{% endhighlight %}
</div>
