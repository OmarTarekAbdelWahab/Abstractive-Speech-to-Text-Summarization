import api from "../utility/api";

const Dashboard = () => {
  const test = async () => {
    console.log("Test clicked");
    const response = await api.get("/user/data");
    console.log("Server Response:", response);
  }

  return <div>
    <h1>Dashboard</h1>
    <button type="button" onClick={test}>Click me</button>
  </div>;
};

export default Dashboard;
