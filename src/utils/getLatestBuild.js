export const fetchLatestCommit = async (owner, repo) => {
  // const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const url = `https://api.github.com/repos/Shanshui2024/status.shanshui.site/commits`; // 出了点小问题，我先写死了（

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();

    // 确保数据结构正确
    if (Array.isArray(data) && data.length > 0) {
      const fullHash = data[0]?.sha; // 获取完整哈希
      if (fullHash) {
        console.log("[addon_SPR-GetCommit] Get commit hash:", fullHash)
        return fullHash.slice(0, 6); // 返回前六位
      }
    }

    throw new Error("No commits found in the repository.");
  } catch (err) {
    console.error("[addon_SPR-GetCommit] Error fetching latest commit:", err);
    throw err; // 向调用者抛出错误
  }
};

export default fetchLatestCommit;
