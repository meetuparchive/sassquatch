 <li:attendee   attendee="${ rsvp }" 
                listing="${listing}" 
                id="rsvp_${rsvp.member.memberId }" 
                json='{ "memberId":"${ix.memberId}", 
                        "chapterId":"${chapter.chapterId}", 
                        "eventId":"${event.eventId}", 
                        "context":"${comment}"}'
                rsvp_type="${rsvp_type}" />
