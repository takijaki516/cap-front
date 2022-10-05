import Input from "./Input";
import Post from "./Post";

const Feed = ({ posts }) => {
  console.log(posts);

  return (
    <div className="space-y-6 pb-24 max-w-2xl ">
      <Input />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
