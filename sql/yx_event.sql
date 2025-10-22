/*
 Navicat Premium Data Transfer

 Source Server         : hello
 Source Server Type    : MySQL
 Source Server Version : 32336
 Source Host           : 192.168.171.128:3306
 Source Schema         : hlyx

 Target Server Type    : MySQL
 Target Server Version : 32336
 File Encoding         : 65001

 Date: 21/10/2025 18:56:40
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_event
-- ----------------------------
DROP TABLE IF EXISTS `yx_event`;
CREATE TABLE `yx_event`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `type` int(4) NULL DEFAULT NULL,
  `data` int(4) NULL DEFAULT NULL,
  `param` varchar(128) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 50003 ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yx_event
-- ----------------------------
INSERT INTO `yx_event` VALUES (0009, 1, 2113, '');
INSERT INTO `yx_event` VALUES (0010, 1, 2115, '');
INSERT INTO `yx_event` VALUES (0001, 1, 2080, '');
INSERT INTO `yx_event` VALUES (0002, 1, 2084, '');
INSERT INTO `yx_event` VALUES (0003, 1, 2089, '');
INSERT INTO `yx_event` VALUES (0004, 1, 2093, '');
INSERT INTO `yx_event` VALUES (0007, 1, 2098, '');
INSERT INTO `yx_event` VALUES (0008, 1, 2100, '');
INSERT INTO `yx_event` VALUES (0011, 1, 2158, '');
INSERT INTO `yx_event` VALUES (0012, 1, 2170, '');
INSERT INTO `yx_event` VALUES (0014, 1, 2206, '');
INSERT INTO `yx_event` VALUES (0013, 1, 2202, '');
INSERT INTO `yx_event` VALUES (0015, 1, 2217, '');
INSERT INTO `yx_event` VALUES (0016, 1, 4068, '');
INSERT INTO `yx_event` VALUES (0017, 1, 4070, '');
INSERT INTO `yx_event` VALUES (0018, 1, 4211, '');
INSERT INTO `yx_event` VALUES (0019, 1, 4215, '');
INSERT INTO `yx_event` VALUES (0020, 1, 4219, '');
INSERT INTO `yx_event` VALUES (0021, 1, 4233, '');
INSERT INTO `yx_event` VALUES (0022, 1, 4236, '');
INSERT INTO `yx_event` VALUES (0023, 1, 7469, '');
INSERT INTO `yx_event` VALUES (0024, 1, 7549, '');
INSERT INTO `yx_event` VALUES (0025, 1, 10961, '');
INSERT INTO `yx_event` VALUES (0035, 1, 15530, '');
INSERT INTO `yx_event` VALUES (0027, 1, 7553, '');
INSERT INTO `yx_event` VALUES (0050, 1, 322069, '');
INSERT INTO `yx_event` VALUES (0046, 1, 143481, '');
INSERT INTO `yx_event` VALUES (0045, 1, 143202, '');
INSERT INTO `yx_event` VALUES (0200, 1, 700128, '');
INSERT INTO `yx_event` VALUES (50000, 1, 86658, '');
INSERT INTO `yx_event` VALUES (2000, 1, 50000270, '');
INSERT INTO `yx_event` VALUES (2551, 1, 156001, '');
INSERT INTO `yx_event` VALUES (50001, 1, 88216, '');
INSERT INTO `yx_event` VALUES (50002, 1, 88244, '');

SET FOREIGN_KEY_CHECKS = 1;
