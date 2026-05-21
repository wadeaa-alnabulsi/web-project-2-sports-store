export default function AboutPage() {
  return (
    <div style={{ padding: "50px 30px", maxWidth: "600px" }}>
      <h2 style={{ color: "#2c3e50" }}>About This Project</h2>
      <p>This is a group project for Web Applications Programming (MERN Stack) — Project 2.</p>
      <p>The app is a full-stack sports product store with authentication and user-specific data management.</p>

      <h3>Tech Stack:</h3>
      <ul>
        <li>React.js (Functional Components + Hooks)</li>
        <li>Node.js + Express.js (REST API)</li>
        <li>MongoDB + Mongoose (Database)</li>
        <li>Express Sessions + bcryptjs (Auth)</li>
        <li>Axios (HTTP Client)</li>
        <li>Deployed on Render.com</li>
      </ul>

      <h3>Features:</h3>
      <ul>
        <li>User Registration & Login with sessions</li>
        <li>Add / Edit / Delete your own products</li>
        <li>Server-side authorization (ownership check)</li>
        <li>Custom POST logging middleware</li>
        <li>Search, Filter, and Sort products</li>
      </ul>

      <h3>Team Members:</h3>
      <ul>
        <li>Student 1 - Name</li>
        <li>Student 2 - Name</li>
      </ul>
    </div>
  );
}
