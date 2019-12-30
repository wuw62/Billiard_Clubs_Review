<?php
    $link = mysqli_connect("localhost", "root", "wxn931222", "AllUSee");
    // Check connection
    if($link === false){
        exit("ERROR: Could not connect to database. " . mysqli_connect_error());
    }
    // Attempt insert query execution
    $sql = "SELECT * FROM Places";
    $result = mysqli_query($link, $sql);
?>

<!DOCTYPE html>
<html>

<head>

    <title>6ww3 Assignment1</title>

    <!--This is for responsive page ajustment-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Use different css files for different screen size-->
    <link rel="stylesheet" type="text/css" media="screen and (max-width: 1200px)" href="css/style_small.css" />
    <link rel="stylesheet" type="text/css" media="screen and (min-width: 1200px) and (orientation:landscape)" href="css/style.css" />

</head>

<body>
    <!--This is head also menu navigation bar-->
    <div class="menu">
        <div>
            <a href="index.html">allUsee</a>
            <div class="parent-container">
                <div class="dropdown">
                    <a href='signin_page.html'>
                        <button class="dropbtn" onclick="window.location.href('signin_page.html')">
                        Signin/up
                    </button>
                    </a>
                </div>
                <!--Search container box-->
                <form class="search-container" action="">
                    <input type="text" placeholder="Search.." name="search">
                    <a href='search_result_listview_page.html'>
                        <button type="button" onclick="window.location.href('search_result_listview_page.html')"><i
                            class="fa fa-search" title="search"></i></button>
                    </a>
                </form>
                <!--Dropdown button implemented and dropdown icon is inserted here-->
                <div class="dropdown">
                    <button class="dropbtn">Rating
                    <i class="fa fa-caret-down"></i>
                </button>
                    <div class="dropdown-content">
                        <a href="#">name</a>
                    </div>
                </div>
            </div>
        </div>
    </div>  
    <!--Search results listed in container box-->
    <div class="result-container-list">
        <h1 style=color:white;>Search Result List View</h1>
        <div>
            <table>
                <tr>
                    <th>Place Name</th>
                    <th>Address</th>
                    <th>Reviews</th>
                    <th>Ratings</th>
                </tr> 

                <?php

                    while($rows = $result->fetch_assoc()){
                ?>
                    <tr>
                    <!-- Read data from mysql, show in the table -->
                        <td>
                            <?php echo $rows['Name']; ?> 
                        </td>
                        <td><?php echo $rows['Address']; ?> </td>
                        <td><?php echo $rows['Description']; ?></td>
                    </tr>
                <?php 
                    }
                ?>
            </table>
        </div>
    </div>
    <a href="search_result_mapview.html">
        <button class="map-view-button" onclick="window.location.href('search_result_mapview.html')">change to map view
            <i class='fa fa-map'></i></button>
    </a>
    <!--This is footer-->
    <div class="footer">
        <p>Copyright 2019</p>
        <p>Contact information: wuw62@mcmaster.ca and zhatiayua59@gmail.com</p>
    </div>
</body>

</html>