CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    phone VARCHAR(10),
    email VARCHAR(30),
    per INT DEFAULT 1, -- 0 admin, 1 user
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BIT DEFAULT 1
);

CREATE TABLE types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(20),
    priceFM FLOAT DEFAULT 1,
    priceFD FLOAT Null,
    electric FLOAT DEFAULT 3.5,
    water FLOAT DEFAULT 1,
    water_follow TINYINT(1) DEFAULT 0, -- 0 thu theo nguoi, 1 thu theo khoi
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BIT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    type INT,
    user_id INT NOT NULL,
    person_limit INT DEFAULT 3,
    electric_number INT DEFAULT 0,
    water_number INT DEFAULT 0,
    more TEXT,
    check_in DATE NULL,
    img_room VARCHAR(40),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BIT DEFAULT 1,
    FOREIGN KEY (type) REFERENCES types(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    UNIQUE (name, user_id)
);

CREATE TABLE renters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    user_id INT,
    name VARCHAR(30) NOT NULL,
    cccd VARCHAR(12) UNIQUE,
    que_quan VARCHAR(100),
    sdt VARCHAR(10),
    img_font VARCHAR(40), -- ảnh mặt trước cccd
    img_back VARCHAR(40), -- ảnh mặt sau cccd
    tctv TINYINT(1) DEFAULT 0, -- 0 chưa đăng ký tạm trú tạm vắng, 1 đã đăng ký
    trang_thai TINYINT(1) DEFAULT 0, -- 0 người ở, 1 khách đến chơi
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BIT DEFAULT 1,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(20) NOT NULL,
    follow TINYINT(1) DEFAULT 0, -- 0 theo tháng, 1 theo số lần
    price FLOAT DEFAULT 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BIT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    UNIQUE(name,user_id)
);

CREATE TABLE room_services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    service_id INT,
    day DATE NOT NULL,
    times INT,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE bill_rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    day DATE NOT NULL,
    room_price FLOAT DEFAULT 0,
    electric_price FLOAT DEFAULT 0,
    electric_number int default 0,
    water_price FLOAT DEFAULT 0,
    water_number int default 0,
    service_price FLOAT DEFAULT 0,
    more_price TEXT,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE NO ACTION ON UPDATE CASCADE
);


insert into users(username,password,email,phone) VALUES ('lank','lank','lank@gmail.com','0349852986');
insert into users(username,password,email,phone,per) VALUES ('admin','admin','admin@gmail.com','0349852986',0);

insert into types(user_id,name,priceFM,priceFD,electric,water,water_follow) values(1,'T1','1200',50,'3.5',50,0),(1,'T2','1000',null,'3.5',50,0);

insert into rooms(user_id,name,type,person_limit,electric_number,water_number,check_in) values (1,'P1',1,3,10631,3,'2024-1-15'),
																								(1,'P2',1,3,9742,3,'2024-1-30'),
                                                                                                (1,'P3',1,3,8422,3,'2024-1-9'),
                                                                                                (1,'P4',1,3,8478,3,'2024-1-11'),
                                                                                                (1,'P5',1,3,2116,3,'2024-1-27'),
                                                                                                (1,'P6',2,3,1106,3,'2024-1-13'),
                                                                                                (1,'P7',2,3,993,3,'2024-1-8'),
                                                                                                (1,'P8',2,3,2637,3,'2024-1-26'),
                                                                                                (1,'P9',2,3,1419,3,'2024-1-21');

insert into renters(user_id,room_id,name,cccd,que_quan,sdt,tctv,trang_thai) values (1,1,'Lu van Cong','033203302930','hy-vl-nd','0348765478',1,0),
																					(1,2,'Dinh thi Hoan','033203302931','hy-vl-nd','0348766478',1,0),
                                                                                    (1,3,'Nguyen van Viet','033203302932','hy-vl-nd','0348465478',1,0),
                                                                                    (1,4,'Sung a La','033203302933','hy-vl-nd','0348765477',1,0),
                                                                                    (1,5,'Ha thi Hang','033203302934','hy-vl-nd','0348765378',1,0),
                                                                                    (1,6,'Ha thi Hong','033203302935','hy-vl-nd','0348765678',1,0),
                                                                                    (1,7,'Dinh van Hiep','033203302936','hy-vl-nd','0348735478',1,0),
                                                                                    (1,8,'Li chi Ngan','033203302937','hy-vl-nd','0348765878',1,0),
                                                                                    (1,9,'Va ba Ly','033203302938','hy-vl-nd','0348765428',1,0);

insert into services(user_id,name,follow,price) values (1,'internet',0,30),(1,'sac xe',1,50);

insert into room_services(room_id,service_id,day,times) values(1,1,'2024-1-15',1),
																(2,1,'2024-1-9',1),
                                                                (3,1,'2024-1-11',1),
                                                                (4,1,'2024-1-27',1),
                                                                (5,1,'2024-1-13',1),
                                                                (6,1,'2024-1-8',1),
                                                                (7,1,'2024-1-26',1),
                                                                (8,1,'2024-1-11',1),
                                                                (9,1,'2024-1-21',1);

insert into bill_rooms(room_id,day,room_price,electric_number,electric_price,water_price,water_number,service_price)
values (1,'2024-02-15',1200,10641,35,50,0,30),
		(2,'2024-02-28',1200,9752,35,50,0,30),
        (3,'2024-02-9',1200,8432,35,50,0,30),
        (4,'2024-02-11',1200,8488,35,50,0,30),
        (5,'2024-02-27',1200,2126,35,50,0,30),
        (6,'2024-02-13',1100,1116,35,50,0,30),
        (7,'2024-02-8',1100,1003,35,50,0,30),
        (8,'2024-02-26',1100,2647,35,50,0,30),
        (9,'2024-02-21',1100,1429,35,50,0,30);

-- Thêm dữ liệu cho dịch vụ "internet" hàng tháng
INSERT INTO room_services (room_id, service_id, day, times)
SELECT 
    r.id AS room_id,
    1 AS service_id, -- ID của dịch vụ "internet"
    DATE_ADD('2024-02-01', INTERVAL seq MONTH) AS day,
    1 AS times -- Dịch vụ internet tính theo tháng, không cần số lần
FROM 
    rooms r,
    (SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18) AS months
WHERE 
    DATE_ADD('2024-02-01', INTERVAL seq MONTH) <= '2025-08-01';

-- Thêm dữ liệu cho dịch vụ "sạc xe" ngẫu nhiên 1-3 lần mỗi tháng
INSERT INTO room_services (room_id, service_id, day, times)
SELECT 
    r.id AS room_id,
    2 AS service_id, -- ID của dịch vụ "sạc xe"
    DATE_ADD('2024-02-01', INTERVAL seq MONTH) + INTERVAL FLOOR(RAND() * 28) DAY AS day,
    FLOOR(1 + RAND() * 3) AS times -- Số lần sử dụng ngẫu nhiên từ 1 đến 3
FROM 
    rooms r,
    (SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18) AS months
WHERE 
    DATE_ADD('2024-02-01', INTERVAL seq MONTH) <= '2025-08-01';



-- /////////////////////////////////////////////////////////////////////////////
-- Bước 1: Xóa bảng tạm nếu tồn tại để tránh lỗi
DROP TEMPORARY TABLE IF EXISTS temp_months;

-- Bước 2: Tạo bảng tạm để lưu danh sách các tháng từ tháng 2/2024 đến tháng 8/2025
CREATE TEMPORARY TABLE temp_months (
    start_date DATE
);

-- Bước 3: Thêm dữ liệu các tháng vào bảng tạm
INSERT INTO temp_months (start_date)
SELECT DATE_ADD('2024-03-01', INTERVAL seq MONTH)
FROM (
    SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 
    UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 
    UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 
    UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18
) AS months
WHERE DATE_ADD('2024-03-01', INTERVAL seq MONTH) <= '2025-08-01';

-- Bước 4: Thêm dữ liệu vào bảng bill_rooms
INSERT INTO bill_rooms (room_id, day, room_price, electric_number, electric_price, water_price, water_number, service_price)
SELECT 
    r.id AS room_id,

    -- Ngày hóa đơn chính xác từ bảng tạm
   DATE(CONCAT(YEAR(m.start_date), '-', MONTH(m.start_date), '-', 
        DAY(
            COALESCE(
                (SELECT MAX(day) FROM bill_rooms WHERE room_id = r.id),
                r.check_in
            )
        )
    )) AS day,

    -- Giá phòng theo loại
    t.priceFM AS room_price,

    -- Lấy số điện tháng trước (nếu chưa có thì lấy từ `rooms`)
    @prev:=COALESCE(
        (SELECT electric_number FROM bill_rooms WHERE room_id = r.id ORDER BY day DESC LIMIT 1),
        r.electric_number
    ) + FLOOR(10 + RAND() * 40) AS electric_number,

    -- Tính tiền điện đúng logic
    (
        @prev
        - COALESCE(
            (SELECT electric_number FROM bill_rooms WHERE room_id = r.id ORDER BY day DESC LIMIT 1),
            r.electric_number
        )
    ) * 3.5 AS electric_price,

    -- Tính tiền nước theo số người thuê phòng
    COALESCE((SELECT COUNT(*) FROM renters WHERE room_id = r.id AND trang_thai = 0), 0) * 50 AS water_price,

    -- Lấy số nước tháng trước và cộng thêm tiêu thụ ngẫu nhiên (10-40)
    0,

    -- Tính tiền dịch vụ của phòng trong tháng này
    COALESCE(
        (SELECT SUM(s.price * rs.times) 
         FROM room_services rs 
         JOIN services s ON rs.service_id = s.id 
         WHERE rs.room_id = r.id 
         AND MONTH(rs.day)  =MONTH(m.start_date) AND YEAR(rs.day) =YEAR(m.start_date)), 
        0
    ) AS service_price

FROM 
    rooms r
JOIN 
    types t ON r.type = t.id
JOIN 
    temp_months m
ORDER BY 
    r.id, m.start_date;

-- Bước 5: Xóa bảng tạm sau khi sử dụng
DROP TEMPORARY TABLE IF EXISTS temp_months;

