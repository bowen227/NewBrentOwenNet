import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-app',
  templateUrl: './blog-app.component.html',
  styleUrls: ['./blog-app.component.css']
})
export class BlogAppComponent implements OnInit {
  public popup: boolean = true;
  public blogs = [
    {
      title: 'From fat to fit',
      info: 'My personal journey from being overweight with chronic back problems to being fit and pain free.',
      author: 'Brent Owen',
      image: '../../assets/workout_1.jpg',
      body: 
      `<h2>Fat to fit</h2>
      <h4>My personal journey</h4>
      <p>
      My name is Brent Owen and it wasn't that long ago I was 70 pounds heavier and a sufferer of chronic back pain. My back would go out every few weeks doing super hard task
      like picking up a dropped piece of paper. Ok, really simple task. I'd be down for a few days and finally push through with the help of muscle relaxers to get back to everyday
      things. I went to lots fo doctors, physical therapist and had more than enought shots in my back.
      </p>
      <p>
      Frankly, I was tired. Tired of all the pain and not being able to do the things I was wanting to do. I was almsot at the point of acceptance that this would be the way it
      is but then I had an appointment with a neuro and spine specialist. I was thinking it would go as all the other appointments went. "We can do shots and get you some physical
      therapy also some muscle relaxers" was usually what I heard. However, this guy was straight up and told me what's hard to hear. Dr told me if I lost some weight I likely would'nt
      have any issues at all or we can do Microdiscectomy which might help.
      </p>
      <p>
      Truth of the matter is there's no way I'm having someone cut on my back. I'd rather walk in pain then not at all. So, my first question was "how much weight"? His response
      "at least 60lbs". Wow! I thought that's a lot of weight. After a lot of other questions the dr talked me into losing the weight.
      </p>
      <p>
      I knew it wouldn't be an easy task but I was finally committed to doing it and if it meant I'd be pain free I was at the point I'd almost do anything. Something I read or
      heard over the yeaers came to mind. What you eat, how much you eat and when you eat is 90% of the losing weight journey. Also, to really jump start your weight loss you
      need to be doing 2 of these and sometimes all 3. With that in mind I thought about different things I could do to get started.
      </p>
      <h5>Down 8lbs</h5>
      <img src="../../assets/down_8lbs.jpg" class="post-image">
      <p>
      I took a look at my diet and started eliminating things slowly at first. Soft drinks and sweet tea were the first things to go.Then I started restricting when I was allowed
      to eat. No more late night snacks!! After about a mounth of these small changes I was down around 8lbs. I thought "heck that's a pretty good start" but I needed to make more
      progress and push myself. I talked myself into a gym membership and change my diet to low carb.
      </p>
      <p>
      Starting back at the gym definitely had its ups and downs. I actually threw my back out dozens fo times just picking up dumbbells. I got to say it was really embarrassing at
      times but I pushed through. Even in pain I'd make myself go to the gym and just move. Pickup some weights and move them around. If it was a really bad pain day i'd just
      walk on the elliptical or jump on a rowing machine and do some slow rowing. However, I didn't shy away form the weights even though they were getting the best of me. I just
      kept pushing and by the end of the second month I was down 10 more pounds.
      </p>
      <p>
      I kept everything the same for the next two months. Each month I dropped another 10 pounds but could notice muscle tone as well. I was definatly getting stronger. I noticed
      my back wasn't going out nearly as often and my pain wasn't daily anymore. I also quit taking all muscle relaxers by this point which was a great feeling. Like freeing
      myself from a leash. I was already half way to my goal and it's only been a few months!! I started pushing myself harder than ever in the gym and became fairly passionate
      about the foods I ate. I was pretty much a gym rat by this point.
      </p>
      <h5>Down 60lbs</h5>
      <img src="../../assets/down_60lbs.jpg" class="post-image">
      <p></p>
      
      `
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

  public closePopup() {
    this.popup = !this.popup;
  }

}
