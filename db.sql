create table users(
    id int PRIMARY key AUTO_INCREMENT,
    username varchar(30) not null UNIQUE,
    password varchar(30) not null,
    phone varchar(10),
    email varchar(30),
    per int default 1
);
CREATE TABLE types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type_name VARCHAR(20),
    electric FLOAT DEFAULT 1,
    water FLOAT DEFAULT 1,
    water_folow bit default 0,#0 thu theo nguoi ,#1 thu theo khoi
    FOREIGN Key (user_id) REFERENCES users(id) on DELETE cascade on UPDATE CASCADE
);
Create table rooms(
	id int primary key AUTO_INCREMENT,
    name varchar(30) not null,
    price float default 1,
    type int,
    user_id int not null,
    person_limit int default 3,
    electric_number int default 0,
    img_room varchar(40),
    FOREIGN KEY (type) REFERENCES types(id) on delete set null on update CASCADE,
    FOREIGN key (user_id) REFERENCES users(id) on delete cascade on update cascade
 );
create table renters(
	id int primary key AUTO_INCREMENT,
    room_id int,
    name varchar(30) not null,
    cccd varchar(12),
    que_quan varchar(100),
    sdt varchar(10),
    img_font varchar(40), # anh mat truoc cccd 
    img_back varchar(40),# anh mat sau cccd
    tctv bit default 0, # 0 chua dang ki tam tru tam vang, 1 da dang ki tam tru tam vang
    dd_tctv varchar(100), # dia diem dang ky tam tru tam vang
    old int default 1,
    trang_thai bit default 0, #0 nguoi o 1 khach den choi
    FOREIGN key (room_id) REFERENCES rooms(id) on delete set null on update CASCADE
);
create table history_room(
	id int PRIMARY key AUTO_INCREMENT,
    room_id int not null,
    ngay DATE DEFAULT,
    hanh_dong bit(2) default b'00', #00 chuyen den, 01 thanh toan dinh ki,10 doi phong, 11 chuyen di
    luong_tien float default 0,
    so_dien int default 0,
    FOREIGN key (room_id) REFERENCES rooms(id) on delete cascade on update cascade
);