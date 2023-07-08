const BoxConfirm = ({ handleCloseDialog, handleRemovePost }) => {
  const handleClickRemove = () => {
    handleRemovePost();
    handleCloseDialog();
  };
  return (
    <div className="boxConfirm">
      <div className="boxContainer">
        <p>Are you sure remove this post?</p>
        <div className="boxBtns">
          <button onClick={handleCloseDialog}>No</button>
          <button onClick={handleClickRemove}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default BoxConfirm;
