import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <div className="space-y-6 pb-24 max-w-2xl ">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
