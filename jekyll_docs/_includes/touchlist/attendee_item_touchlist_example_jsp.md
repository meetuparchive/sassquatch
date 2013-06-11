<%-- JSP --%>
 <li:attendee 	attendee="${ rsvp }" 
 		listing="${listing}" 
 		rsvp_type="${rsvp_type}" 
 		id="rsvp_${rsvp.member.memberId }" 
		json='{	"memberId":"${ix.memberId}", 
			"chapterId":"${chapter.chapterId}", 
			"eventId":"${event.eventId}", 
			"context":"${comment}"}'
/>


