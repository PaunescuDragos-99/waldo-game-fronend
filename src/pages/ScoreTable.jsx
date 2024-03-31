// eslint-disable-next-line react/prop-types
export default function ScoreTable({ leaderboardData }) {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData?.map((item, key) => (
          <tr key={key}>
            <td>{item.username}</td>
            <td>{item.score}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
