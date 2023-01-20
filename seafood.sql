CREATE DATABASE seafood;
USE `seafood`;
/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `name` VARCHAR(20) DEFAULT NULL,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`username`)
) 

/*Data for the table `admin` */

INSERT  INTO `admin`(`name`,`username`,`password`) VALUES 
('kharima amalia','kharisma12','12345');

/*Table structure for table `categories` */


CREATE TABLE `categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

/*Data for the table `categories` */

INSERT  INTO `categories`(`id`,`name`) VALUES 
(1,'makanan'),
(2,'minuman');

/*Table structure for table `products` */
CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(20) DEFAULT NULL,
  `harga` INT(11) DEFAULT NULL,
  `stok` VARCHAR(20) DEFAULT NULL,
  `photo` VARCHAR(35) DEFAULT NULL,
  `kategori` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categories` (`kategori`),
  CONSTRAINT `fk_categories` FOREIGN KEY (`kategori`) REFERENCES `categories` (`id`)
)

/*Data for the table `products` */

INSERT  INTO `products`(`id`,`nama`,`harga`,`stok`,`photo`,`kategori`) VALUES 
(1,'cumi asin nyam nyam',20000,'10','cumi.jpg',1),
(2,'es kelapa bandar ',15000,'20','kelapaes.jpeg',2),
(3,'sotong tinta hitam',20000,'20','sotong.jpg',1);
