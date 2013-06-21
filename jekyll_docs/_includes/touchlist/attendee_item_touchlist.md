<div class="doc-content">
	<div class="line">
		<div class="unit size1of2 gutter-right">
			<h2>Attendee Item TouchList</h2>
			<p> Initially designed for the Attendee/RSVP list on event details, we can use this pattern whenever we need to display member data in a list.</p>
		</div>
		<div class="lastUnit">
			{% include touchlist/attendee_item_touchlist_example.md %}

		    <li class="touchList-item--attendee">
		        <div class="ff-box">
		            <div class="ff-box-flex">
		                <a href="${member_url}" class="figureset j-btn touchList-item--attendee-figureset">
		                    <div class="figureset-figure avatar-m pin-top">
		                      <img src="assets/img/uhura.jpg" />
		                    </div>

		                    <div class="figureset-description">
		                        <h4 class="touchList-item--attendee-label">
		                           Lieutenant Uhura
		                        </h4>
		                    </div>
		                </a>
		            </div>
		          
		            <div class="ff-box-fix touchList-item--attendee-secondary-actions">
		              <a class="button small niceToSeeYou primary" data-memberId="${attendee.member.id}" href="#">
		                  <span>Good to see you</span>
		              </a>
		            </div>
		        </div>
		    </li>
		    <li class="touchList-item--attendee">
		        <div class="ff-box">
		            <div class="ff-box-flex">
		                <a href="${member_url}" class="figureset j-btn touchList-item--attendee-figureset">
		                    <div class="figureset-figure avatar-m pin-top">
		                      <img src="assets/img/kirk2.jpg" />
		                    </div>

		                    <div class="figureset-description">
		                        <h4 class="touchList-item--attendee-label">
		                           Evil Kirk
		                        </h4>
		                    </div>
		                </a>
		            </div>
		        
		            <div class="ff-box-fix touchList-item--attendee-secondary-actions">
		              <a class="button small niceToSeeYou primary" data-memberId="${attendee.member.id}" href="#">
		                  <span>Good to see you</span>
		              </a>
		            </div>
		        </div>
		    </li>
		  </ul>

		</div>
	</div>

	{% highlight jsp %}{% include touchlist/attendee_item_touchlist_example_jsp.md %}{% endhighlight %}


	{% highlight html %}{% include touchlist/attendee_item_touchlist_example.md %}{% endhighlight %}
	
</div>