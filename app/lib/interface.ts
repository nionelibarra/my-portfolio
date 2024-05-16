export interface ProjectsCard {
  title: string;
  _id: string;
  imageUrl: string;
  tags: string[];
  description: string;
  link: string;
}

interface SocialMediaAccount {
  imageUrl: string;
  url: string;
  socialmedianame: string;
  username: string;
}

export interface HomePageData {
  header: string;
  subheader: string;
  techstackUrls: string[];
  socialmediaaccounts:SocialMediaAccount[];
  aboutmeheader:string[];
  aboutmesubheader:string[];
  profilepic:string;
  profilepictwo:string;
}
