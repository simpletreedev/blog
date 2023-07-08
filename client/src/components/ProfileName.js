import moment from "moment"

const ProfileName = ({data}) => {
  return (
    <div className="profileName">
      <p>
        <b>Intro: </b> <span>{data?.bio}</span>
      </p>
      <p>
        <b>Location: </b>
        <span>{data?.location}</span>
      </p>
      <p>
        <b>Joined: </b>
        <span>{moment(data?.joinDate).format("LL")}</span>
      </p>
      <p>
        <b>Posts: </b>
        <span>{data?.posts?.length}</span>
      </p>
      <p>
        <b>Comments: </b>
        <span>{data?.comments?.length}</span>
      </p>
    </div>
  );
};

export default ProfileName;
