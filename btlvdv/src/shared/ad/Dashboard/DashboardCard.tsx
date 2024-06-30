import { Breadcrumb, theme, Image, Space, Card, Statistic } from "antd";
function DashboardCard(Props: any) {
    return (
      <Card style={{backgroundColor:"bisque",marginLeft:"5px",width:"224px"}}>
        <Space direction="horizontal">
          {/* <Card style={{width:"100%"}}> */}
            {Props.icon}
            <Statistic title={Props.title} value={Props.value} />
          {/* </Card> */}
        </Space>
      </Card>
    );
  }
export default DashboardCard;