import mongoose from "mongoose"


const connectionDB = async () => {
   
  try {
      const conn = await mongoose.connect(process.env.MONGODB_URI )
      console.log(`MONGODB CONNECTED to DATABASE ${conn.connection.host}`);
  } catch (error) {
     console.log(`MONGODB CONNECTION failed ${error}`);
  }




}


export default connectionDB