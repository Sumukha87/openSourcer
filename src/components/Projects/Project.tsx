import { useState, useEffect } from "react";

type ProjectProps = {
  username: string;
  repo_name: string;
  name: string;
  link: string;
};
type RepoData = {
  description: string;
  language: string;
};

export default function Project({
  username,
  repo_name,
  name,
  link,
}: ProjectProps) {
  const [data, setData] = useState<RepoData | null>(null);

  useEffect(() => {
    function getRepo() {
      fetch(
        `https://api.github.com/repos/${username.trim()}/${repo_name.trim()}?client_id=ec1594e91cfa6b4281cb&client_secret=02388e8e126c1f3d96d7b2a59350a3620c08c137`
      )
        .then((res) => res.json())
        .then((result: RepoData) => setData(result));
    }
    if (data) return;
    getRepo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="max-w-32 min-h-[11rem]  flex flex-col justify-between items-start
     w-full bg-slate-800 backdrop-blur-3xl shadow rounded p-3 m1"
    >
      <h1 className="text-xl">{name}</h1>
      <small className="text-gray-500 ">
        @{username}/{repo_name} <br />
      </small>
      <p className="text-sm line-clamp-3 text-gray-400">
        {data
          ? data.description
            ? data.description
            : "This repository does not have a description available for display at the moment. or The API limit has exceeded"
          : "loading"}
      </p>
      <div className="w-full flex items-end justify-end">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="bg-white hover:bg-slate-200 justify-center mt-3 block active:bg-slate-500 items-center text-black py-1 shadow px-4 rounded-full "
        >
          Repository &rarr;
        </a>
      </div>
    </div>
  );
}
