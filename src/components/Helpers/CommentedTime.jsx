

export  const CommentedTime = ({CommentDate}) => {

    const CommentedDate = new Date(CommentDate);
    const now = new Date();
   


    const utc1 = Date.UTC(CommentedDate.getFullYear(), CommentedDate.getMonth(), CommentedDate.getDate());
    console.log(utc1)
    const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const ms_per_day = 24*60*60*1000;
    const difference = Math.floor((utc2-utc1)/ms_per_day);

    if(difference==0){
        let commentedTime = "Today";
        return commentedTime;
    }else if(difference<2){
        let commentedTime = "1 day ago";
        return commentedTime;
    }else if(difference>2 && difference<30){
        let commentedTime = difference + " days ago";
        return commentedTime;
    } else if(difference>30 && difference<365){
        let commentedTime = Math.floor(difference/ 30)+" months ago"; 
        return commentedTime;
    }
    else{
        let commentedTime = Math.floor(difference/365)+"years ago"
        return commentedTime;
}
}








