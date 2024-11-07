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
    check_in date,
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
    room_id int not null,
    ngay DATE,
    hanh_dong TINYINT(1) default b'0', #0 chuyen den, 1 thanh toan dinh ki,2 doi phong, 3 chuyen di, 4 chi
    luong_tien float default 0,
    so_dien int default 0,
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
insert into types(user_id,name,price,electric,water,water_follow) values(1,'tang_1',1200000,3500,50000,0),(1,'tang_2',1000000,3500,20000,1);
insert into rooms(name,type,user_id,person_limit,electric_number,img_room,check_in) values('phong_1',1,1,3,0,'','2024-07-22'),('phong_2',2,1,3,0,'','2024-07-22');
insert into renters(user_id,name,que_quan,sdt,cccd,img_font,img_back,tctv,room_id,trang_thai) values(1,'ngo xuan quyen','tq-vl-hy','0963852107','033003001892','','',0,1,0),
																										(1,'ngo van tinh','tq-vl-hy','','','','',0,1,0),
                                                                                                        (1,'ngo xuan tinh','tq-vl-hy','0963852107','033003001892','','',0,2,0),
                                                                                                        (1,'ngo xuan cang','tq-vl-hy','0963852107','033003001892','','',0,2,1);
insert into services(user_id,name,follow,price) values (1,'sac xe',1,20),(1,'giat',1,12),(1,'gui xe',0,100);