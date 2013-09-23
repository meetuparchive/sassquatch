<div class="doc-content">
	<div class="line-gutters">
		<div class="unit size1of3">
			<h2>Layout modifiers</h2>
			<p>Sometimes we need to apply some extra layout/decoration rules to a container element. These classes should allow you do to this without explicitly declaring new CSS rules for a given element.</p>
			<p>
				 <code>.doc-padding</code>
			</p>
			<p>
				 <code>.rounded-top</code>, <code>.rounded-bottom</code>, <code>.rounded-left</code>, <code>.rounded-right</code>, <code>.rounded-all</code>
			</p>
			<p>
				 <code>.span-25</code>, <code>.span-30</code>, <code>.span-50</code>, <code>.span-60</code>, <code>.span-75</code>
			</p>
			<p>
				 <code>.block</code>, <code>.inline</code>, <code>.inline-block</code>, <code>.display-none</code>, <code>.hidden</code>
			</p>
			<p>
				 <code>.clearfix</code>, <code>.clear-both</code>
			</p>
			<p>
				 <code>.block-if-js</code>, <code>.inline-if-js</code>, <code>.inline-block-if-js</code>, <code>.hide-if-js</code>
			</p>
		</div>
		<div class="unit lastUnit">
			<h3>Changing the display property</h3>
            <table> 
                <thead>
                    <tr>
                        <th>css class</th>
                        <th>purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td headers="class"><code>.block</code></td>
                        <td headers="purpose">sets display to "block"</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.inline</code></td>
                        <td headers="purpose">sets display to "block"</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.inline-block</code></td>
                        <td headers="purpose">sets display to "inline-block"</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.display-none</code></td>
                        <td headers="purpose">sets display to "none"</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.hidden</code></td>
                        <td headers="purpose">sets visibility to "hidden"</td>
                    </tr>
                </tbody>
            </table>

			<h3>Changing widths of elements</h3>
			<p>These classes will apply a percentage width to any element.</p>
			<em>25%</em> <code>.span-25</code>
			<div class="guide-hasBackground span-25">&nbsp;</div>
			<em>30%</em> <code>.span-30</code>
			<div class="guide-hasBackground span-30">&nbsp;</div>
			<em>50%</em> <code>.span-50</code>
			<div class="guide-hasBackground span-50">&nbsp;</div>
			<em>60%</em> <code>.span-60</code>
			<div class="guide-hasBackground span-60">&nbsp;</div>
			<em>75%</em> <code>.span-75</code>
			<div class="guide-hasBackground span-75">&nbsp;</div>
			<em>100%</em> <code>.span-100</code>
			<div class="guide-hasBackground span-100">&nbsp;</div>

			<h3 class="margin-top">Generic padding helper</h3>
			<div class="guide-hasBackground doc-padding">
				<p style="background: lightblue">The parent DIV of this paragraph has <code>.doc-padding</code></p>
			</div>
			
			<h3 class="margin-top">Rounding corners of boxes</h3>
			<p class="guide-hasBackground rounded-top" style="padding: 1em;">
				Rounded top <code>.rounded-top</code>
			</p>
			<p class="guide-hasBackground rounded-bottom" style="padding: 1em;">
				Rounded bottom <code>.rounded-bottom</code>
			</p>
			<p class="guide-hasBackground rounded-left" style="padding: 1em;">
				Rounded left <code>.rounded-left</code>
			</p>
			<p class="guide-hasBackground rounded-right" style="padding: 1em;">
				Rounded right <code>.rounded-right</code>
			</p>
			<p class="guide-hasBackground rounded-all" style="padding: 1em;">
				Rounded all <code>.rounded-all</code>
			</p>

			<h3>Float clearing</h3>
            <table> 
                <thead>
                    <tr>
                        <th>css class</th>
                        <th>purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td headers="class"><code>.clearfix</code></td>
                        <td headers="purpose">clears all floated children of the element.  <br />
                            see: <a target="_blank" href="http://www.positioniseverything.net/easyclearing.html">http://www.positioniseverything.net/easyclearing.html</a>
                        </td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.clear-both</code></td>
                        <td headers="purpose">adds <code>clear: both;</code> rule to the element</td>
                    </tr>
                </tbody>
            </table>


			<h3>Javascript degradation helpers</h3>
            <p>
                Why show someone a feature that they can't use without javascript? Why hide javascript-dependent content from people without javascript? 
                These classes will give you a bit more control over how things work with and without JS. No need to utilize the <code>.hasJS</code> class
                in your stylesheets; you can just use these helpers.
            </p>
            <table> 
                <thead>
                    <tr>
                        <th>css class</th>
                        <th>purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td headers="class"><code>.hide-if-js</code></td>
                        <td headers="purpose">sets display to "none" if javascript is available</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.block-if-js</code></td>
                        <td headers="purpose">sets display to "block" if javascript is available</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.inline-if-js</code></td>
                        <td headers="purpose">sets display to "inline" if javascript is available</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.inline-block-if-js</code></td>
                        <td headers="purpose">sets display to "inline-block" if javascript is available</td>
                    </tr>
                    <tr>
                        <td headers="class"><code>.inline-block-if-js</code></td>
                        <td headers="purpose">sets display to "inline-block" if javascript is available</td>
                    </tr>
                </tbody>
            </table>
		</div>
	</div>
</div>
