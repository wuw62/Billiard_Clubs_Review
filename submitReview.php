<?php
header("Content-type: text/html; charset=utf-8");
    if (1)
    {  
        // record each input value
        $name = $_POST['objectname'];

        $address = $_POST['address'];

        $latitude = $_POST['latitude'];

        $longitude = $_POST['longitude'];

        $description = $_POST['description'];

        /**
         * Save image to server
         */
        $imgname = $_FILES["image"]["name"];  //retreive image name
        $url="/var/www/html/6ww3_assignment2/resource/images/"; //setup directory of image in server
        if (file_exists($url.$imgname)){  // check existence
            exit($imgname . " already exists. ");  
        }  
        else
        {  
            $url=$url.$_FILES["image"]["name"];  
            $finished = move_uploaded_file($_FILES["image"]["tmp_name"],$url);// save image to local storage in server
            echo ($url);
        }  


        /**
         * Save video to server
         */
        $vidname = $_FILES["video"]["name"];
        $url="/var/www/html/6ww3_assignment2/resource/videos/";
        if (file_exists($url.$vidname)){  
            exit($vidname . " already exists. ");  
        }  
        else
        {  
            $url=$url.$_FILES["video"]["name"];  
            $finished = move_uploaded_file($_FILES["video"]["tmp_name"],$url);
            echo ($url);
        } 
        
        
        $link = mysqli_connect("localhost", "root", "wxn931222", "AllUSee");
        // Check connection
        if($link === false){
            exit("ERROR: Could not connect to database. " . mysqli_connect_error());
        }
        // Attempt insert query execution
        $sql = "INSERT INTO Places (Name, Address, ImageName, VideoName, Latitude, Longitude, Description)"
        . "VALUES ('$name', '$address', '$imgname', '$vidname', '$latitude', '$longitude', '$description')";
        if(mysqli_query($link, $sql)){
            echo "Records inserted successfully.";
        } else{
            echo "ERROR: Could not execute $sql. " . mysqli_error($link);
        }
        // Close connection
        mysqli_close($link);
     }  
    else  
    {  
        echo "Invalid file";  
    }  

    /**
     * AWS S3 uppoad
     * @param string $file image name
     * @return array
     */
    function fileUpload($file){
        //set time limit
        set_time_limit(0);
        //for security reason, I put my access keys on my server but not in zip
        $credentials = new Aws\Credentials\Credentials('AWS access KEY ID ', 'AWS secret  access KEY'); 
        //create s3 client
        $s3 = new Aws\S3\S3Client([
            'version'     => 'latest',
            'region'      => 'us-east-2',
            'credentials' => $credentials,
        ]);
    
        $bucket = '6ww3_assignmnet3';//'name of bucket';

        $source = "/var/www/html/6ww3_assignment2/resource/images/".$file; 
        $uploader = new Aws\S3\MultipartUploader($s3, $source, [
            'bucket' => $bucket,
            'key'    => $file,
            //setup permission
            'ACL'    => 'public-read',
            'before_initiate' => function (\Aws\Command $command) {
                $command['CacheControl'] = 'max-age=3600';  //CreateMultipartUpload operation
            },
            'before_upload'   => function (\Aws\Command $command) {
                $command['RequestPayer'] = 'requester';     //UploadPart operation
            },
            'before_complete' => function (\Aws\Command $command) {
                $command['RequestPayer'] = 'requester';     //CompleteMultipartUpload operation
            },
        ]);
    
        try {
            $result = $uploader->upload(); //upload
            $data = [
            'type' => '1',
            'data' => urldecode($result['ObjectURL'])
            ];
        } catch (Aws\Exception\MultipartUploadException $e) {  //if fail, save error message
            $uploader =  new Aws\S3\MultipartUploader($s3, $source, [
                'state' => $e->getState(),
            ]);
            $data = [
            'type' => '0',
            'data' =>  $e->getMessage();
            ];
    }
    return $data;
    }

?> 