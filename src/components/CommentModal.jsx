import { useState } from "react";
import "../App.css";

const CommentModal = ({ profile, index, closeCommentModal, updateProfileData }) => {
	const [comment, setComment] = useState(profile?.comment || "");

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// Add your logic to handle the comment submission
		profile.comment = comment;
		updateProfileData(profile, index);
		console.log(`Comment for ${profile.name}: ${comment}`);
		closeCommentModal();
	};

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<form className="comment-modal">
				<textarea
					className="comment-textarea"
					placeholder="Write a comment"
					value={comment}
					type="text"
					onChange={handleCommentChange}
					maxLength={150}
				/>
				<div className="textarea-functionalities">
					<div className="empty-space"></div>
					<p className="comment-length">{comment.length}/150</p>
					<div
						type="submit"
						className="submit-button"
						onClick={handleCommentSubmit}
					>
						<p className="submit-button-text">Done</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CommentModal;
