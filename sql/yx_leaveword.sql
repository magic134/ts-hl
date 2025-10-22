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

 Date: 21/10/2025 18:57:08
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_leaveword
-- ----------------------------
DROP TABLE IF EXISTS `yx_leaveword`;
CREATE TABLE `yx_leaveword`  (
  `id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `send_name` char(15) NOT NULL DEFAULT '未知',
  `time` char(15) NOT NULL DEFAULT '00000000000000',
  `words` char(255) NOT NULL DEFAULT '无内容',
  PRIMARY KEY (`id`),
  INDEX `user_id`(`user_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 8 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
