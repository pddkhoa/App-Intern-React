import React from "react";
import Carousel from "react-grid-carousel";
import { Avatar, Space } from "antd";
import { Card, CardContent, Typography, Item, Grid } from "@mui/material";
import { fetchAllUser } from "../Service/userService";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

function Home() {
  const [numberPage, setNumberPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [listUser, setListUser] = useState([]);
  //
  useEffect(() => {
    getUsers(1);
  }, []);
  //
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setListUser(res.data);
      setTotalPage(res.total_pages);
      setTotalUser(res.total);
    }
  };
  //

  //
  return (
    <Carousel cols={3} rows={2} gap={10} loop showDots={true}>
      {Array.from(Array(totalPage)).map(
        (_, indexPage) =>
          listUser &&
          listUser.length > 0 &&
          listUser.map((item, index) => {
            return (
              <Carousel.Item>
                <Card key={index} className="mx-2" sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Space direction="vertical" size={16}>
                      <Space wrap size={16}>
                        <Avatar
                          size={64}
                          icon={<i className="fa-solid fa-user"></i>}
                        />
                      </Space>
                    </Space>
                    <Typography
                      sx={{ mt: 1.5, mb: 1.5 }}
                      color="text.secondary"
                    >
                      {item.first_name} {item.last_name}
                    </Typography>
                    <Typography variant="body2">{item.email}</Typography>
                  </CardContent>
                </Card>
              </Carousel.Item>
            );
          })
      )}
    </Carousel>
  );
}
export default Home;
