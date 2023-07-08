export const getRootComments = (data) => {
  return data?.filter((c) => !c.parentId);
};

export const getReplyComments = (data, commentId) => {
  return data?.filter((c) => c.parentId === commentId);
};
