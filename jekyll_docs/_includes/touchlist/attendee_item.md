<h2 class="section-subtitle">Attendee Item TouchList</h2>
<p> Initially designed for the Attendee/RSVP list on event details, 
    we can use this pattern whenever we need to display member data in a list.
</p>


<div class="doc-box">
    <ul class="touchList">
        {% include touchlist/attendee_item_example.md %}
        <li class="touchList-item touchList-item--attendee">
            <div class="ffbox">
                <div class="ffbox-flex">
                    <a href="${member_url}" class="ffbox ffbox--touchList-item ffbox--fixed">
                        <div class="ffbox-fix avatar-m pintop touchList-attendee-photo">
                            <img src="assets/img/bones.jpg" />
                        </div>
                        <div class="ffbox-flex touchList-attendee-info">
                            <h4 class="touchList-label touchList-attendee-name">
                                Dr. Leonard McCoy
                            </h4>
                            <h6 class="touchList-caption touchList-attendee-role">Chief Medical Officer</h6>
                        </div>
                    </a>
                </div>
                <div class="ffbox-fix touchList-attendee-actions">
                    <a class="button small niceToSeeYou primary" href="#">
                        <span>Good to see you</span>
                    </a>
                </div>
            </div>
        </li>
        <li class="touchList-item touchList-item--attendee">
            <div class="ffbox">
                <div class="ffbox-flex">
                    <a href="${member_url}" class="ffbox ffbox--touchList-item ffbox--fixed">
                        <div class="ffbox-fix avatar-m pintop touchList-attendee-photo">
                            <img src="assets/img/uhura.jpg" />
                        </div>
                        <div class="ffbox-flex touchList-attendee-info">
                            <h4 class="touchList-label touchList-attendee-name">
                                Nyota Uhura
                            </h4>
                            <h6 class="touchList-caption touchList-attendee-role">Communications Officer</h6>
                        </div>
                    </a>
                </div>
                <div class="ffbox-fix touchList-attendee-actions">
                    <a class="button small niceToSeeYou primary" href="#">
                        <span>Good to see you</span>
                    </a>
                </div>
            </div>
        </li>
        <li class="touchList-item touchList-item--attendee">
            <div class="ffbox">
                <div class="ffbox-flex">
                    <a href="${member_url}" class="ffbox ffbox--touchList-item ffbox--fixed">
                        <div class="ffbox-fix avatar-m pintop touchList-attendee-photo">
                            <img src="assets/img/kirk2.jpg" />
                        </div>
                        <div class="ffbox-flex touchList-attendee-info">
                            <h4 class="touchList-label touchList-attendee-name">
                                James T. Kirk
                            </h4>
                            <h6 class="touchList-caption touchList-attendee-role">Captain</h6>
                        </div>
                    </a>
                </div>
                <div class="ffbox-fix touchList-attendee-actions">
                    <a class="button small niceToSeeYou primary" href="#">
                        <span>Good to see you</span>
                    </a>
                </div>
            </div>
        </li>
    </ul>
</div>

<div class="j-code">
    <!--{% highlight jsp %}{% include touchlist/attendee_item_example_jsp.md %}{% endhighlight %}-->
    {% highlight html %}{% include touchlist/attendee_item_example.md %}
    </ul>
</div> 
{% endhighlight %}

</div>
