import "../App.css";

const ProfileCard = ({ profile, index, handleDelete }) => {
	return (
		<div
			className="profile-card"
			onClick={() => {
				chrome.tabs.create({ url: profile.profileUrl });
			}}
		>
			{profile.imageUrl ===
			"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ? (
				<svg
					width="50"
					height="50"
					viewBox="0 0 50 50"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M41.6666 43.75C41.6666 40.8426 41.6666 39.3889 41.3078 38.2059C40.4998 35.5426 38.4156 33.4584 35.7523 32.6505C34.5694 32.2917 33.1157 32.2917 30.2082 32.2917H19.7916C16.8842 32.2917 15.4304 32.2917 14.2475 32.6505C11.5842 33.4584 9.5 35.5426 8.69208 38.2059C8.33325 39.3889 8.33325 40.8426 8.33325 43.75M34.3749 15.625C34.3749 20.8027 30.1776 25 24.9999 25C19.8222 25 15.6249 20.8027 15.6249 15.625C15.6249 10.4473 19.8222 6.25 24.9999 6.25C30.1776 6.25 34.3749 10.4473 34.3749 15.625Z"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : (
				<img
					src={profile.imageUrl}
					alt={profile.name}
					className="profile-image"
				/>
			)}
			<div className="text-container">
				<p className="text-name">{profile.name}</p>
				{/* TODO: Add company name */}
				{/* <p className="text-position">{profile.company}</p> */}
				<p className="text-position">Company - Position</p>
			</div>
			<button
				className="delete-button"
				onClick={(e) => {
					e.stopPropagation();
					handleDelete(index);
				}}
			>
				<svg
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.6667 6.25001V5.41668C16.6667 4.2499 16.6667 3.66651 16.4396 3.22086C16.2399 2.82886 15.9212 2.51015 15.5291 2.31041C15.0835 2.08334 14.5001 2.08334 13.3333 2.08334H11.6667C10.4999 2.08334 9.9165 2.08334 9.47085 2.31041C9.07885 2.51015 8.76014 2.82886 8.5604 3.22086C8.33333 3.66651 8.33333 4.2499 8.33333 5.41668V6.25001M10.4167 11.9792V17.1875M14.5833 11.9792V17.1875M3.125 6.25001H21.875M19.7917 6.25001V17.9167C19.7917 19.6668 19.7917 20.5419 19.4511 21.2104C19.1515 21.7984 18.6734 22.2765 18.0854 22.5761C17.4169 22.9167 16.5418 22.9167 14.7917 22.9167H10.2083C8.45817 22.9167 7.58309 22.9167 6.91461 22.5761C6.32661 22.2765 5.84854 21.7984 5.54894 21.2104C5.20833 20.5419 5.20833 19.6668 5.20833 17.9167V6.25001"
						stroke="#EE2D2D"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ProfileCard;
