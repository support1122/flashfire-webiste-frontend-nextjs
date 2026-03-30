// Preload critical homepage images via <link rel="preload"> tags (server component - zero JS)
const VIDEO_PROFILE_IMAGES = [
  {
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552896/website_thumbnails-19_imnzdt.jpg",
    smallProfileImage: "https://res.cloudinary.com/drcka8x04/image/upload/c_thumb,g_face,w_100,h_100,f_auto,q_auto:good/v1766552896/website_thumbnails-19_imnzdt.jpg"
  },
  {
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552897/website_thumbnails-20_bxnl2z.jpg",
    smallProfileImage: "https://res.cloudinary.com/drcka8x04/image/upload/c_thumb,g_face,w_100,h_100,f_auto,q_auto:good/v1766552897/website_thumbnails-20_bxnl2z.jpg"
  },
  {
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552895/website_thumbnails-18_j1ormv.jpg",
    smallProfileImage: "https://res.cloudinary.com/drcka8x04/image/upload/c_thumb,g_face,w_100,h_100,f_auto,q_auto:good/v1766552895/website_thumbnails-18_j1ormv.jpg"
  },
];

export default function HomeImagePreloader() {
  return (
    <>
      {VIDEO_PROFILE_IMAGES.map((video, i) => (
        <link key={i} rel="preload" as="image" href={video.profileImage} crossOrigin="anonymous" />
      ))}
    </>
  );
}
