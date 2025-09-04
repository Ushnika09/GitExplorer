import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack, BiStar, BiCopy } from "react-icons/bi";
import { FaCodeFork } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import moment from "moment";

function RepoDetails() {
  const { owner, name } = useParams();
  const [repo, setRepo] = useState(null);
  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);
  const [pulls, setPulls] = useState([]);
  const [activeCloneMethod, setActiveCloneMethod] = useState("https");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${name}`);
      setRepo(await repoRes.json());

      const langRes = await fetch(`https://api.github.com/repos/${owner}/${name}/languages`);
      setLanguages(await langRes.json());

      const contrRes = await fetch(`https://api.github.com/repos/${owner}/${name}/contributors`);
      setContributors(await contrRes.json());

      const pullsRes = await fetch(`https://api.github.com/repos/${owner}/${name}/pulls?state=all`);
      setPulls(await pullsRes.json());
    };

    fetchData();
  }, [owner, name]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!repo) return <p className="text-center mt-10">Loading...</p>;

  // Calculate language percentages
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const languageData = Object.entries(languages).map(([lang, bytes]) => ({
    language: lang,
    bytes,
    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
  })).sort((a, b) => b.bytes - a.bytes);

  // Language colors
  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    Rust: "#dea584",
    CSS: "#563d7c",
    HTML: "#e34c26",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Ruby: "#701516",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    Lua: "#000080",
    Shell: "#89e051",
    Dart: "#00B4AB",
    Scala: "#c22d40",
    Perl: "#0298c3",
    Haskell: "#5e5086",
    Elixir: "#6e4a7e",
    Clojure: "#db5855",
    Default: "#6366f1"
  };

  // Clone URLs
  const httpsUrl = `https://github.com/${owner}/${name}.git`;
  const sshUrl = `git@github.com:${owner}/${name}.git`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back */}
      <Link to="/" className="flex items-center gap-2 text-purple-600 hover:underline mb-6">
        <BiArrowBack /> Back to Explorer
      </Link>

      {/* Repo Header with Owner Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={repo.owner?.avatar_url} 
            alt={repo.owner?.login} 
            className="w-16 h-16 rounded-full border-2 border-purple-200"
          />
          <div>
            <h1 className="text-3xl font-bold">{repo.name}</h1>
            <p className="text-gray-600 flex items-center gap-1">
              by 
              <a 
                href={repo.owner?.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline font-medium"
              >
                {repo.owner?.login}
              </a>
            </p>
            {repo.description && (
              <p className="text-gray-700 mt-2">{repo.description}</p>
            )}
          </div>
        </div>
        
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 text-nowrap">
          View on GitHub
        </a>
      </div>

      {/* Clone Repository Section */}
      <div className="mb-8 bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Clone Repository</h2>
        <div className="mb-4">
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${activeCloneMethod === "https" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveCloneMethod("https")}
            >
              HTTPS
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${activeCloneMethod === "ssh" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveCloneMethod("ssh")}
            >
              SSH
            </button>
          </div>
          
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={activeCloneMethod === "https" ? httpsUrl : sshUrl}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(activeCloneMethod === "https" ? httpsUrl : sshUrl)}
              className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <BiCopy />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Use Git or checkout with SVN using the web URL.
        </p>
      </div>

      {/* Repository Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white rounded-2xl shadow p-6 mb-8">
        <Stat label="Stars" value={repo.stargazers_count} icon={<BiStar className="text-yellow-500" />} />
        <Stat label="Forks" value={repo.forks_count} icon={<FaCodeFork className="text-gray-600" />} />
        <Stat label="Watchers" value={repo.subscribers_count} icon={<IoEyeOutline className="text-blue-500" />} />
        <Stat label="Open Issues" value={repo.open_issues_count} />
        <Stat label="Pull Requests" value={pulls.length} />
        <Stat label="Size" value={`${(repo.size / 1024).toFixed(1)} MB`} />
      </div>

      {/* Language Breakdown */}
      {languageData.length > 0 && (
        <div className="mb-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Languages</h2>
          <div className="space-y-4">
            {languageData.map((lang, index) => (
              <LanguageBar 
                key={lang.language} 
                language={lang.language} 
                percentage={lang.percentage} 
                color={languageColors[lang.language] || languageColors.Default}
              />
            ))}
          </div>
        </div>
      )}

      {/* Contributors */}
      {contributors.length > 0 && (
        <div className="mb-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Contributors</h2>
          <ul className="space-y-2">
            {contributors.slice(0, 5).map((contrib) => (
              <li key={contrib.id} className="flex items-center gap-3">
                <img src={contrib.avatar_url} alt={contrib.login}
                  className="w-10 h-10 rounded-full" />
                <a href={contrib.html_url} target="_blank" rel="noopener noreferrer"
                  className="font-semibold hover:underline">
                  {contrib.login}
                </a>
                <span className="text-gray-600 ml-2">
                  {contrib.contributions} contributions
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* About */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <CiCalendar className="text-lg" />
            <span className="font-medium">Created:</span> 
            {moment(repo.created_at).format("MMMM D, YYYY")}
          </li>
          <li>
            <span className="font-medium">Default branch:</span> 
            <span className="bg-gray-100 px-2 py-1 rounded-md ml-2 font-mono">{repo.default_branch}</span>
          </li>
          <li>
            <span className="font-medium">Repository size:</span> 
            {(repo.size / 1024).toFixed(1)} MB
          </li>
          <li>
            <span className="font-medium">License:</span> 
            {repo.license ? repo.license.name : "No license"}
          </li>
          <li>
            <span className="font-medium">Primary Language:</span> 
            {repo.language || "Not specified"}
          </li>
          <li>
            <span className="font-medium">Last updated:</span> 
            {moment(repo.updated_at).fromNow()}
          </li>
        </ul>
      </div>
    </div>
  );
}

const Stat = ({ label, value, icon }) => (
  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex justify-center items-center mb-2">
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

const LanguageBar = ({ language, percentage, color }) => {
  // Format percentage to one decimal place
  const formattedPercentage = percentage.toFixed(1);
  
  return (
    <div className="flex items-center">
      <span className="w-24 font-medium text-gray-700">{language}</span>
      <div className="flex-1 mx-4">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
      <span className="w-16 text-right font-medium text-gray-700">
        {formattedPercentage}%
      </span>
    </div>
  );
};

export default RepoDetails;