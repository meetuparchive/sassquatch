<div class="line-gutters">
	<div class="unit size1of3">
		<h2>Tearsheet icons</h2>
		<p>Tearshees act as a universal companion icon to upcoming Meetups. They contain the date of the event, but should never be relied on as the only conveyance of the event date.</p>
		<p><code>.tearsheet-25</code>, <code>.tearsheet</code>, <code>.tearsheet-80</code></p>
	</div>
	<div class="unit lastUnit">
		<div class="doc-box">
			<div class="doc-content">
				{% include tearsheet_example.md %}
				<time class="tearsheet">
					<span class="month">Oct</span>
					<span class="day">##</span>
				</time>
				<time class="tearsheet-80">
					<span class="month">Oct</span>
					<span class="day">80</span>
				</time>
			</div>
		</div>
		{% highlight html %} {% include tearsheet_example.md %} {% endhighlight html %} 
	</div>
</div>
