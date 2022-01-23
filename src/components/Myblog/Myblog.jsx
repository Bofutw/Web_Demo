import React, { useEffect, useState } from 'react'
import './myblog.css'



export default function BlogShow() {
    let memberid;
    let journeyid;
    const [blog, setBlog] = useState([]);
    const [journey, setJourney] = useState([]);
    useEffect(() => {
        memberid = window.localStorage.memberid;
        getmemberblog(memberid)
        getmemberjourney(memberid)
    }, [])
    function popcard(e) {
        document.getElementById(`popcard-${e.target.id.slice(8,11)}`).setAttribute('checked', 'checked')       
        let temp = document.getElementsByName("popcard")
        for(let i =0 ;i<temp.length;i++){
            if(temp[i].checked){
                journeyid = temp[i].value.slice(9,13)
            }
        }
        
    }
    function getmemberblog(id) {
        fetch(`http://localhost:8080/blog/memberid=${id}`)
            .then((res) => {
                return res.json();
            })
            .then((result) => {             
            for(let i =0;i<result.length;i++){
                console.log(result[i].blogdetail)
                result[i].blogdetail = JSON.parse(result[i].blogdetail)
            }
                setBlog(result)
            })


    }

    function getmemberjourney(id) {
        fetch(`http://localhost:8080/journey/memberid=${id}`)
            .then((res) => {
                console.log(res)
                return res.json();
            })
            .then((result) => {
                console.log(result)
                                            
            for(let i =0;i<result.length;i++){
                console.log(result[i].blogdetail)
                result[i].journeydetail = JSON.parse(result[i].journeydetail)
            }
                setJourney(result)
            })

    }
    function editExistBlog(e){
        fetch(`http://localhost:8080/blog/${e.target.id.slice(6,10)}`)
        .then((res)=>{
            return res.json();
        })
        .then((result)=>{
            window.localStorage.blog = JSON.stringify(result)
            window.localStorage.removeItem("journeyforblog")
            window.location.href = "/Blogeditor";
        })
        
    }
    function editExistJourney(){

         fetch(`http://localhost:8080/journey/${journeyid}`)
         .then((res)=>{
             return res.json();
         })
         .then((result)=>{
             window.localStorage.journeyforblog = JSON.stringify(result)
             window.localStorage.removeItem("blog")
             window.location.href = "/Blogeditor";
         })
        
    }
    return (

        <div >
            <div class="demo" style={{ backgroundImage: 'url("/images/563231_l.jpg")', backgroundSize: 'cover', paddingRight: '100px', height: '900px', backgroundPosition: 'center' }}>
                <h2 class="penName">我的遊記
                    <button class="button" style={{ marginLeft: '290px' }}>
                        <a href="#popup" style={{ color: "black" }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    </button>
                </h2>

                <div class="popup" id="popup">
                    <div class="popup-inner">
                        <div style={{ marginTop: '30px' }}>
                            <h2>—撰寫遊程—</h2>
                            <p>選擇想要新增的旅遊紀錄吧</p>
                        </div>
                        <div class="popup__text">
                        {journey.map((item,id)=>{
                            return <div><input type='radio' id={`popcard-${id}`} name='popcard' style={{ display: 'none' }} value={"journeyid"+item.journeyid}/>
                            <div class="popCard" id={`element-${id}`} onClick={popcard}>
                                <div id={`element-${id}`} class="" >
                                    <img id={`element-${id}`} src="\blogimg\b1\44879896482_720c553daa_c.jpg" class="img-fluid" alt="" style={{}} />
                                </div>
                                <div id={`element-${id}`} class="myblog-content" style={{ padding: '10px' }}>
                                    <h5 id={`element-${id}`}>{item.journeydetail.title}</h5>
                                </div>
                            </div></div>
                        })}
                            


                        </div>
                        <button onClick={editExistJourney} style={{ marginLeft: '650px', marginBottom: '13px' }}>開始撰寫</button>
                        <a class="popup__close" href="#">X</a>
                    </div>
                </div>
                <div class="mainCard">

                    {/* <div class="mainCardHeader"></div> */}
                    <div class="mainCardContent" >
                        {blog.map((item) => {
                            console.log(item.blogdetail)                            
                            //item.blogdetail = JSON.parse(item.blogdetail);
                            return <div class="miniCard">
                            <div class="myblog-imgbox" >
                                <img src={item.blogdetail.url} class="img-fluid" alt="" style={{}} />
                            </div>
                            <div class="myblog-content" style={{ padding: '10px' }}>
                                <h5>{item.blogdetail.title}</h5>
                                <p>{item.blogdetail.decrption}</p>
                                <a onClick={editExistBlog} id={`blogid${item.blogid}`} class="btn btn-primary" style={{ marginLeft: '100px', marginTop: '-60px', fontSize: '12px' }}>編輯 <i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>


                        })}

                    </div>
                </div>

            </div>


        </div>
    )
}