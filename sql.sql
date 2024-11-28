create table users(
    id int PRIMARY key AUTO_INCREMENT,
    username varchar(30) not null UNIQUE,
    password varchar(30) not null,
    phone varchar(10),
    email varchar(30),
    per int default 1 # 0 admin, 1 user
);
CREATE TABLE types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(20),
    price float default 1,
    electric FLOAT DEFAULT 3.5,
    water FLOAT DEFAULT 1,
    water_follow TINYINT(1) default 0,#0 thu theo nguoi ,#1 thu theo khoi
    FOREIGN Key (user_id) REFERENCES users(id) on DELETE cascade on UPDATE CASCADE
);
Create table rooms(
id int primary key AUTO_INCREMENT,
    name varchar(30) not null,
    type int,
    user_id int not null,
    person_limit int default 3,
    electric_number int default 0,
    water_number int default 0,
    more text,
    check_in date null,
    img_room varchar(40),
    FOREIGN KEY (type) REFERENCES types(id) on delete set null on update CASCADE,
    FOREIGN key (user_id) REFERENCES users(id) on delete cascade on update cascade
 );
create table renters(
id int primary key AUTO_INCREMENT,
    room_id int,
    user_id int,
    name varchar(30) not null,
    cccd varchar(12),
    que_quan varchar(100),
    sdt varchar(10),
    img_font varchar(40), # anh mat truoc cccd
    img_back varchar(40),# anh mat sau cccd
    tctv TINYINT(1) default 0, # 0 chua dang ki tam tru tam vang, 1 da dang ki tam tru tam vang
    trang_thai TINYINT(1) default 0, #0 nguoi o 1 khach den choi
    FOREIGN key (room_id) REFERENCES rooms(id) on delete set null on update CASCADE,
    FOREIGN key (user_id) REFERENCES users(id) on delete set null on update cascade
);
create table history_room(
id int PRIMARY key AUTO_INCREMENT,
    room_id int null,
    ngay DATE,
    hanh_dong TINYINT(1) default b'0', #0 chuyen den, 1 thanh toan dinh ki, 2 chuyen di, 3 chi
    luong_tien float default 0,
    mo_ta text,
    FOREIGN key (room_id) REFERENCES rooms(id) on delete cascade on update cascade
);
create table services(
    id int primary key auto_increment,
    user_id int,
    name varchar(20) not null,
    follow TINYINT(1) default 0,#0 theo thang 1 theo so lan
    price float default 0,
    FOREIGN key (user_id) REFERENCES users(id) on delete cascade on update cascade
);
create table room_services(
    id int primary key auto_increment,
    room_id int,
    service_id int,
    day varchar(40),
    times int,
    foreign key (room_id) references rooms(id) on delete set null on update cascade,
    foreign key (service_id) references services(id) on delete set null on update cascade
);

Insert into users(username,password,phone,email,per) values('lank','lank','0349852986','buuixuanhoangc@gmail.com',0),('test','test','0793248659','test@gmail.com',1);
INSERT INTO types(user_id, name, price, electric, water, water_follow)
VALUES
(1, 'tang_3', 1100000, 3500, 25000, 0),  -- 1 - 1
(1, 'tang_4', 1300000, 4000, 30000, 1),  -- 2 - 1
(2, 'vip_tang_1', 1500000, 5000, 40000, 0), -- 3 -2
(2, 'vip_tang_2', 1800000, 5500, 50000, 1), -- 4 -2
(2, 'tang_5', 1000000, 3000, 20000, 0);   -- 5 -2
INSERT INTO rooms(name, type, user_id, person_limit, electric_number, water_number, more, check_in, img_room)
VALUES
('room_101', 1, 1, 3, 0, 0, 'Phòng tầng 1, gần cầu thang', '2024-07-22', ''), 
('room_102', 1, 1, 3, 0, 0, 'Phòng tầng 1, hướng cửa sổ', '2024-07-22', ''), 
('room_201', 2, 1, 4, 0, 0, 'Phòng tầng 2, gần cầu thang', '2024-07-22', ''),
('room_202', 2, 1, 4, 0, 0, 'Phòng tầng 2, hướng ban công', '2024-07-22', ''),
('room_301', 1, 1, 3, 0, 0, 'Phòng tầng 3, có ban công', '2024-07-22', ''),
('room_302', 2, 1, 3, 0, 0, 'Phòng tầng 3, gần cầu thang', '2024-07-22', ''),
('room_401', 1, 1, 4, 0, 0, 'Phòng tầng 4, gần cầu thang', '2024-07-22', ''),
('room_402', 2, 1, 4, 0, 0, 'Phòng tầng 4, hướng ban công', '2024-07-22', ''),
('vip_101', 5, 2, 2, 0, 0, 'Phòng VIP tầng 1, gần cầu thang', '2024-07-22', ''), 
('vip_102', 5, 2, 2, 0, 0, 'Phòng VIP tầng 1, hướng ban công', '2024-07-22', ''),
('vip_201', 3, 2, 2, 0, 0, 'Phòng VIP tầng 2, gần cầu thang', '2024-07-22', ''),
('vip_202', 4, 2, 2, 0, 0, 'Phòng VIP tầng 2, hướng ban công', '2024-07-22', ''),
('room_501', 3, 2, 3, 0, 0, 'Phòng tầng 5, có cửa sổ lớn', '2024-07-22', ''),
('room_502', 4, 2, 3, 0, 0, 'Phòng tầng 5, gần thang máy', '2024-07-22', ''),
('room_503', 5, 2, 3, 0, 0, 'Phòng tầng 5, cuối hành lang', '2024-07-22', '');
INSERT INTO renters(user_id, name, que_quan, sdt, cccd, img_font, img_back, tctv, room_id, trang_thai)
VALUES
(1, 'Nguyen Van A', 'Ha Noi', '0912345678', '123456789012', '', '', 0, 1, 0),
(1, 'Tran Thi B', 'Hai Phong', '0987654321', '234567890123', '', '', 1, 1, 0),
(1, 'Le Van C', 'Nam Dinh', '0909090909', '345678901234', '', '', 0, 2, 0),
(1, 'Hoang Thi D', 'Da Nang', '0988888888', '456789012345', '', '', 1, 2, 0),
(1, 'Pham Van E', 'Hue', '0977777777', '567890123456', '', '', 0, 3, 0),
(1, 'Nguyen Thi F', 'HCM', '0966666666', '678901234567', '', '', 0, 3, 0),
(1, 'Bui Van G', 'Dong Nai', '0955555555', '789012345678', '', '', 1, 4, 1),
(1, 'Pham Thi H', 'Long An', '0944444444', '890123456789', '', '', 0, 4, 0),
(2, 'Nguyen Van I', 'An Giang', '0933333333', '901234567890', '', '', 0, 9, 0),
(2, 'Tran Thi K', 'Ca Mau', '0922222222', '012345678901', '', '', 1, 9, 0),
(2, 'Le Van L', 'Can Tho', '0911111111', '112345678901', '', '', 0, 10, 1),
(2, 'Hoang Thi M', 'Tien Giang', '0900000000', '223456789012', '', '', 0, 11, 0),
(2, 'Pham Van N', 'Kien Giang', '0899999999', '334567890123', '', '', 0, 12, 0),
(2, 'Nguyen Thi O', 'Vinh Long', '0888888888', '445678901234', '', '', 1, 13, 0),
(2, 'Bui Van P', 'Soc Trang', '0877777777', '556789012345', '', '', 0, 14, 0),
(2, 'Pham Thi Q', 'Bac Lieu', '0866666666', '667890123456', '', '', 0, 15, 0),
(1, 'Le Van R', 'Tra Vinh', '0855555555', '778901234567', '', '', 1, 8, 1),
(1, 'Hoang Thi S', 'Dong Thap', '0844444444', '889012345678', '', '', 0, 7, 0),
(1, 'Pham Van T', 'Ha Tinh', '0833333333', '990123456789', '', '', 0, 6, 0),
(1, 'Nguyen Thi U', 'Quang Binh', '0822222222', '001234567890', '', '', 1, 5, 0),
(1, 'Bui Van V', 'Quang Tri', '0811111111', '112345678901', '', '', 0, 4, 0),
(1, 'Pham Thi W', 'Thanh Hoa', '0800000000', '223456789012', '', '', 0, 3, 0),
(2, 'Nguyen Van X', 'Nghe An', '0799999999', '334567890123', '', '', 0, 12, 1),
(2, 'Tran Thi Y', 'Quang Nam', '0788888888', '445678901234', '', '', 1, 12, 0),
(2, 'Le Van Z', 'Quang Ngai', '0777777777', '556789012345', '', '', 0, 13, 0);
INSERT INTO services(user_id, name, follow, price)
VALUES
(1, 'Dọn phòng', 0, 100),        -- 1 --> 1-8
(1, 'Gửi xe máy', 1, 50),       -- 2 --> 1-8
(1, 'Giặt ủi', 1, 15),          -- 3 --> 1-8
(1, 'Internet', 0, 200),        -- 4 --> 1-8
(1, 'Truyền hình cáp', 0, 150), -- 5 --> 1-8
(2, 'Sửa điện', 1, 30),         -- 6 --> 9-15
(2, 'Sửa nước', 1, 25),         -- 7 --> 9-15
(2, 'Dịch vụ ăn sáng', 0, 500), -- 8 --> 9-15
(2, 'Vệ sinh điều hòa', 1, 100),-- 9 --> 9-15
(2, 'Gửi ô tô', 0, 300);        -- 10 --> 9-15
INSERT INTO room_services(room_id, service_id, day, times)
VALUES
(1, 1, '2024-07-01', 1),  -- Phòng 1 sử dụng dịch vụ dọn phòng hàng tháng
(1, 2, '2024-07-05', 1),  -- Phòng 1 sử dụng dịch vụ gửi xe máy hàng tháng
(1, 4, '2024-07-10', 1),  -- Phòng 1 sử dụng dịch vụ Internet hàng tháng
(2, 3, '2024-07-08', 2),  -- Phòng 2 sử dụng dịch vụ giặt ủi 2 lần
(2, 5, '2024-07-12', 1),  -- Phòng 2 sử dụng dịch vụ truyền hình cáp hàng tháng
(3, 3, '2024-07-15', 1),  -- Phòng 3 sử dụng dịch vụ sửa điện 1 lần
(4, 3, '2024-07-16', 1),  -- Phòng 3 sử dụng dịch vụ sửa nước 1 lần
(4, 1, '2024-07-18', 1),  -- Phòng 4 sử dụng dịch vụ ăn sáng hàng tháng
(4, 2, '2024-07-20', 1),  -- Phòng 4 sử dụng dịch vụ vệ sinh điều hòa 1 lần
(5, 1, '2024-07-22', 1), -- Phòng 5 sử dụng dịch vụ gửi ô tô hàng tháng
(5, 4, '2024-07-01', 1),  -- Phòng 5 sử dụng dịch vụ dọn phòng hàng tháng
(6, 2, '2024-07-03', 1),  -- Phòng 6 sử dụng dịch vụ gửi xe máy hàng tháng
(6, 4, '2024-07-05', 1),  -- Phòng 6 sử dụng dịch vụ Internet hàng tháng
(7, 3, '2024-07-07', 3),  -- Phòng 7 sử dụng dịch vụ giặt ủi 3 lần
(7, 5, '2024-07-10', 1),  -- Phòng 7 sử dụng dịch vụ truyền hình cáp hàng tháng
(8, 5, '2024-07-15', 1),  -- Phòng 8 sử dụng dịch vụ ăn sáng hàng tháng
(8, 3, '2024-07-17', 1),  -- Phòng 8 sử dụng dịch vụ vệ sinh điều hòa 1 lần
(9, 6, '2024-07-19', 2),  -- Phòng 9 sử dụng dịch vụ sửa điện 2 lần
(9, 7, '2024-07-21', 1),  -- Phòng 9 sử dụng dịch vụ sửa nước 1 lần
(10, 10, '2024-07-25', 1); -- Phòng 10 sử dụng dịch vụ gửi ô tô hàng tháng

INSERT INTO history_room (room_id, ngay, hanh_dong, luong_tien, mo_ta) VALUES
(1, '2024-08-15', 1, 1200000, 
 '[{"category":"Tiền phòng","price":1100000,"times":1,"sum":1100000}, {"category":"Tiền nước","price":25000,"times":2,"sum":50000}, {"category":"Tiền điện","price":3500,"times":12,"sum":42000}]'),
(2, '2024-08-15', 1, 1300000, 
 '[{"category":"Tiền phòng","price":1300000,"times":1,"sum":1300000}, {"category":"Tiền nước","price":30000,"times":3,"sum":90000}, {"category":"Tiền điện","price":4000,"times":15,"sum":60000}]'),
(3, '2024-08-16', 1, 1500000, 
 '[{"category":"Tiền phòng","price":1500000,"times":1,"sum":1500000}, {"category":"Tiền nước","price":20000,"times":2,"sum":40000}, {"category":"Tiền điện","price":3000,"times":10,"sum":30000}]'),
(4, '2024-08-17', 1, 1800000, 
 '[{"category":"Tiền phòng","price":1800000,"times":1,"sum":1800000}, {"category":"Tiền nước","price":25000,"times":4,"sum":100000}, {"category":"Tiền điện","price":3500,"times":8,"sum":28000}]'),
(5, '2024-08-18', 1, 1000000, 
 '[{"category":"Tiền phòng","price":1000000,"times":1,"sum":1000000}, {"category":"Tiền nước","price":30000,"times":5,"sum":150000}, {"category":"Tiền điện","price":4000,"times":6,"sum":24000}]'),
(6, '2024-08-19', 1, 1400000, 
 '[{"category":"Tiền phòng","price":1400000,"times":1,"sum":1400000}, {"category":"Tiền nước","price":20000,"times":3,"sum":60000}, {"category":"Tiền điện","price":3500,"times":9,"sum":31500}]'),
(7, '2024-08-20', 1, 1250000, 
 '[{"category":"Tiền phòng","price":1250000,"times":1,"sum":1250000}, {"category":"Tiền nước","price":25000,"times":2,"sum":50000}, {"category":"Tiền điện","price":3000,"times":12,"sum":36000}]'),
(8, '2024-08-21', 1, 1350000, 
 '[{"category":"Tiền phòng","price":1350000,"times":1,"sum":1350000}, {"category":"Tiền nước","price":20000,"times":1,"sum":20000}, {"category":"Tiền điện","price":4000,"times":10,"sum":40000}]'),
(9, '2024-08-22', 1, 1100000, 
 '[{"category":"Tiền phòng","price":1100000,"times":1,"sum":1100000}, {"category":"Tiền nước","price":15000,"times":4,"sum":60000}, {"category":"Tiền điện","price":2500,"times":8,"sum":20000}]'),
(10, '2024-08-23', 1, 1450000, 
 '[{"category":"Tiền phòng","price":1450000,"times":1,"sum":1450000}, {"category":"Tiền nước","price":30000,"times":2,"sum":60000}, {"category":"Tiền điện","price":4000,"times":5,"sum":20000}]'),
(1, '2024-08-24', 1, 1150000, 
 '[{"category":"Tiền phòng","price":1150000,"times":1,"sum":1150000}, {"category":"Tiền nước","price":25000,"times":3,"sum":75000}, {"category":"Tiền điện","price":3500,"times":7,"sum":24500}]'),
(2, '2024-08-25', 1, 1300000, 
 '[{"category":"Tiền phòng","price":1300000,"times":1,"sum":1300000}, {"category":"Tiền nước","price":20000,"times":2,"sum":40000}, {"category":"Tiền điện","price":3000,"times":6,"sum":18000}]'),
(3, '2024-08-26', 1, 1600000, 
 '[{"category":"Tiền phòng","price":1600000,"times":1,"sum":1600000}, {"category":"Tiền nước","price":30000,"times":3,"sum":90000}, {"category":"Tiền điện","price":4000,"times":12,"sum":48000}]'),
(4, '2024-08-27', 1, 1400000, 
 '[{"category":"Tiền phòng","price":1400000,"times":1,"sum":1400000}, {"category":"Tiền nước","price":25000,"times":5,"sum":125000}, {"category":"Tiền điện","price":3500,"times":8,"sum":28000}]'),
(5, '2024-08-28', 1, 1200000, 
 '[{"category":"Tiền phòng","price":1200000,"times":1,"sum":1200000}, {"category":"Tiền nước","price":15000,"times":4,"sum":60000}, {"category":"Tiền điện","price":2500,"times":10,"sum":25000}]'),
(6, '2024-08-29', 1, 1500000, 
 '[{"category":"Tiền phòng","price":1500000,"times":1,"sum":1500000}, {"category":"Tiền nước","price":30000,"times":2,"sum":60000}, {"category":"Tiền điện","price":4000,"times":11,"sum":44000}]'),
(7, '2024-08-30', 1, 1250000, 
 '[{"category":"Tiền phòng","price":1250000,"times":1,"sum":1250000}, {"category":"Tiền nước","price":20000,"times":1,"sum":20000}, {"category":"Tiền điện","price":3500,"times":9,"sum":31500}]'),
(8, '2024-08-31', 1, 1350000, 
 '[{"category":"Tiền phòng","price":1350000,"times":1,"sum":1350000}, {"category":"Tiền nước","price":15000,"times":3,"sum":45000}, {"category":"Tiền điện","price":3000,"times":10,"sum":30000}]'),
(9, '2024-09-01', 1, 1450000, 
 '[{"category":"Tiền phòng","price":1450000,"times":1,"sum":1450000}, {"category":"Tiền nước","price":25000,"times":4,"sum":100000}, {"category":"Tiền điện","price":4000,"times":7,"sum":28000}]'),
(10, '2024-09-02', 1, 1550000, 
 '[{"category":"Tiền phòng","price":1550000,"times":1,"sum":1550000}, {"category":"Tiền nước","price":20000,"times":2,"sum":40000}, {"category":"Tiền điện","price":3500,"times":6,"sum":21000}]');

