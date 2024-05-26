import { useState } from "react";
import "../App.css";

const CommentModal = ({ profile, closeCommentModal }) => {
	const [comment, setComment] = useState("");

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// Add your logic to handle the comment submission
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
				<div
					type="submit"
					className="submit-button"
					// TODO: Add onClick event handler
					onClick={handleCommentSubmit}
				>
					<p className="submit-button-text">Done</p>
				</div>
			</form>
		</div>
	);
};

export default CommentModal;
