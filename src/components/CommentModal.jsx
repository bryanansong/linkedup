import { useState } from "react";
import "../App.css";
import toast from "react-hot-toast";

const CommentModal = ({ profile, index, closeCommentModal, updateProfileData }) => {
	const [comment, setComment] = useState(profile?.comment || "");

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleDiscard = (e) => {
		e.stopPropagation();
		setComment("");
		profile.comment = "";
		updateProfileData(profile, index);
		toast.success("Note discarded", {
			icon: "🗑️",
		});
		closeCommentModal();
	};

	const handleCommentSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();

		profile.comment = comment;
		updateProfileData(profile, index);
		toast.success("Note saved!", {
			icon: "📝",
		});
		closeCommentModal();
	};

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<form className="comment-modal">
				<textarea
					className="comment-textarea"
					placeholder="Add a note..."
					value={comment}
					type="text"
					onChange={handleCommentChange}
					maxLength={150}
				/>
				<div className="textarea-functionalities">
					<div className="empty-space" />
					<p className="comment-length">{comment.length}/150</p>
					<div
						className="discard-button"
						onClick={handleDiscard}
					>
						<p className="submit-button-text">Discard</p>
					</div>
					<div
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
