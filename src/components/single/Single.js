import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";

const Single = (props) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.product.imageURL && <img src={props.product.imageURL} alt="" />}
            <h1>{props.product.name}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}</span>
                  <span className="itemValue">{item[1]}</span>
                </div>
              ))}
            {/* {Object.entries(props.product).map(([key, value]) => {
              // Chỉ map các trường cụ thể
              const fieldsToShow = ["description", "availableQuantity", "price", "id"];

              if (fieldsToShow.includes(key)) {
                return (
                  <div className="item" key={key}>
                    <span className="itemTitle">{key}</span>
                    <span className="itemValue">{value.toString()}</span>
                  </div>
                );
              }

              return null; // Bỏ qua các trường không mong muốn
            })} */}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    key={dataKey.name} // Added key prop here for unique identification
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Single;
