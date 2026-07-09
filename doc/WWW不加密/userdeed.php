<?php include("conn.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>幻灵游戏 - 幻灵游侠私服巨作</title>
<link href="zui.min.css" rel="stylesheet" type="text/css" />
<link href="main.css" rel="stylesheet" type="text/css" />
<link href="bootbox.min.css" rel="stylesheet">
</head>
	<body class="mainbg" style="background-position:-1200px 0px;">
	<div class="btn-group" style="margin-left:2.5%;">
		  <label class="btn btn-warning">
		    <a href="index.php" style="text-decoration:none ;out-line: none;color: #fff"> 人物红利榜 </a>
		  </label>
		  <label class="btn btn-warning active">
		    <a href="#" style="text-decoration:none ;out-line: none;color: #fff"> 人物功德榜 </a>
		  </label>
		  <label class="btn btn-warning">
		    <a href="usermoney.php" style="text-decoration:none ;out-line: none;color: #fff"> 人物幻币榜 </a>
		  </label>
		  <label class="btn btn-warning">
		    <a href="pet.php" style="text-decoration:none ;out-line: none;color: #fff"> 所有宠物总榜 </a>
		  </label>
		  <label class="btn btn-warning">
		    <a href="pet2.php" style="text-decoration:none ;out-line: none;color: #fff"> 不可进化宠榜 </a>
		  </label>
		</div>

	
	
		<table class="table table-bordered table-responsive" style="width: 95%;margin: 0 auto;margin-bottom:50px; color: orange;background-color: #ececec;">
			<thead >
		    	<tr>
		      		<th style="background-color: orange;"><font color="blue">排名</font></th>
		      		<th style="background-color: orange;"><font color="blue">昵称</font></th>
		      		<th style="background-color: orange;"><font color="blue">人物</font></th>
		      		<th style="background-color: orange;"><font color="blue">等级</font></th>
		      		<th style="background-color: orange;"><font color="blue">称号</font></th>
					<th style="background-color: orange;"><font color="blue">功德</font></th>
		    	</tr>
		  	</thead>
		  	<tbody>
			<?php
			$flag = 1;
			if($flag == 0){
				$sql = "select name,floor(level) as level,metempsychosis as chenghao,look,degree_lev,deed,floor((metempsychosis%1000)/10) as toutai,floor(additional_point/100000) as hongli from yx_user WHERE
account_id BETWEEN  '1' AND '9999' order by deed desc limit 0,100";
			}else{
				$sql = "select name,floor(level) as level,metempsychosis as chenghao,look,degree_lev,deed,floor((metempsychosis%1000)/10) as toutai,floor(additional_point/100000) as hongli from yx_user WHERE
account_id BETWEEN  '1' AND '9999' order by deed desc limit 0,100";
			}
			$cx = $dbh->query($sql);
			$result = $cx->fetchAll();
			$dbh = null;
			$head = "";
			foreach ($result as $k => $v) {
			echo '<tr>
			<td>'.($k+1).'</font></td>
			<td>'.($v['name']).'</font></td>
			<td><img src="img/'.head($v['look']).'.bmp" width="20px" style="margin: 0 auto;"></td>
			<td style="text-align: right;">'.($v['level']).'</font></td>
			<td>'.chenghao($v['chenghao']).'['.$v['toutai'].']</font></td>
			<td>'.($v['deed']).'</td>
			</tr>';
			}
			function chenghao($id){
				$xian = $id%10;
				$type = intval($id/1000);
				$arr = array(
					0 => array(
						0 	=> '凡人',
						1 	=> '散仙',
					),
					1 => array(
						0 	=> '凡人',
						1 	=> '散仙',
						2 	=> '地仙',
						3 	=> '天仙',
						4 	=> '大罗金仙',
						15 	=> '通灵天神',
						25	=> '巡游天神',
						35	=> '功德天神',
						45	=> '火淬天神',
						55	=> '尚武天神',
					),
					2 => array(
						0 	=> '凡人',
						1 	=> '散仙',
						2 	=> '夜叉',
						3 	=> '阿修罗',
						4 	=> '魔神',
						15 	=> '摄魂魔尊',
						25	=> '堕天魔尊',
						35	=> '泯灭魔尊',
						65	=> '幻变魔尊',
						75	=> '嗜血魔尊',
					),
				);
				return $result = $arr[$xian][$type];
			}
			function head($head){
				$filename = "";
				if($head<18){
					$filename = 'Man0'.intval($head/3+1);
				}else if($head<36 && $head >17){
					$filename = 'Woman0'.intval($head/3-5);
				}else if($head == 190){
					$filename = 'Man07';
				}else if($head == 191){
					$filename = 'Man08';
				}else if($head == 192){
					$filename = 'Woman07';
				}else if($head == 193){
					$filename = 'Woman08';
				}
				return $filename;
			}
			?>
			</tbody>
		</table>
	</body>
</html>