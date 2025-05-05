package com.opalmp3.Dao.musicDAO;

import com.opalmp3.Model.Track;
import com.opalmp3.Utils.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository("trackDAO")
public class TrackDAOImpl implements TrackDAO {

    private Connection conn;

    public TrackDAOImpl() throws Exception {
        this.conn = DBUtil.getConnection();
    }
    
    

//    @Override
//    public List<Track> getAllTracks() throws Exception {
//        List<Track> list = new ArrayList<>();
//        PreparedStatement ps = conn.prepareStatement("SELECT * FROM music");
//        ResultSet rs = ps.executeQuery();
//        while (rs.next()) {
//            Track t = new Track();
//            t.setId(rs.getInt("id"));
//            t.setTitle(rs.getString("title"));
//            t.setArtist(rs.getString("artist"));
//            t.setAlbum(rs.getString("album"));
//            t.setGenre(rs.getString("genre"));
//            t.setReleaseDate(rs.getString("release_date"));
//            t.setDuration(rs.getString("duration"));
//            list.add(t);
//        }
//        return list;
//    }
    
    
    @Override
    public Map<String, Object> getAllTracks(int page, int limit, String sortColumn, String sortOrder)  throws Exception{
        
        Map<String, Object> result = new HashMap<>();
        List<Track> list = new ArrayList<>();
        
            // Calculate the offset based on the page and limit
//        int offset = (page - 1) * limit;
//        if (offset < 0) {
//        offset = 0;
//        }
//        String sql = "SELECT * FROM music LIMIT ? OFFSET ?";

        int offset = page;

        String sql = "CALL getPaginatedTracks(?, ?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        
            // values for debugging
//        System.out.println("SQL Query: " + sql);
//        System.out.println("Offset: " + offset + ", Limit: " + limit + ", Sort Column: " + sortColumn + ", Sort Order: " + sortOrder);

        ps.setInt(1, offset); // Starting position for pagination
        ps.setInt(2, limit); // no of records to fetch
        ps.setString(3, sortColumn); // Set the sort column
        ps.setString(4, sortOrder);  // Set the sort order

        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            Track t = new Track();
            t.setId(rs.getInt("id"));
            t.setTitle(rs.getString("title"));
            t.setArtist(rs.getString("artist"));
            t.setAlbum(rs.getString("album"));
            t.setGenre(rs.getString("genre"));
            t.setReleaseDate(rs.getString("release_date"));
            t.setDuration(rs.getString("duration"));
            list.add(t);
        }
        rs.close();
        
        // Move to the next result set for total count
            if (ps.getMoreResults()) {
        ResultSet countRs = ps.getResultSet();
        if (countRs.next()) {
            int totalCount = countRs.getInt("totalCount");
            result.put("totalCount", totalCount);
        }
        countRs.close();
    }
            
    result.put("musicList", list);
        return result;
    }
    
//    @Override
//    public int getTotalCount() throws Exception {
//        int totalCount = 0;
//        String sql = "SELECT COUNT(*) FROM music";
//        PreparedStatement ps = conn.prepareStatement(sql);
//        ResultSet rs = ps.executeQuery();
//        if (rs.next()) {
//            totalCount = rs.getInt(1);
//        }
//        return totalCount;
//    }


    @Override
    public void addTrack(Track t) throws Exception {
        String sql = "INSERT INTO music (title, artist, album, genre, release_date, duration) VALUES (?, ?, ?, ?, ?, ?)";
//        PreparedStatement ps = conn.prepareStatement(
//            "INSERT INTO music (title, artist, album, genre, release_date, duration) VALUES (?, ?, ?, ?, ?, ?)");
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, t.getTitle());
        ps.setString(2, t.getArtist());
        ps.setString(3, t.getAlbum());
        ps.setString(4, t.getGenre());
        ps.setString(5, t.getReleaseDate());
        ps.setString(6, t.getDuration());
        
        int rowsInserted = ps.executeUpdate();
//        ps.executeUpdate();

        System.out.println("Rows inserted: " + rowsInserted);
    }
    }
    

    @Override
     public void updateTrack(Track t) throws Exception {
        PreparedStatement ps = conn.prepareStatement(
            "UPDATE music SET title=?, artist=?, album=?, genre=?, release_date=?, duration=? WHERE id=?");
        ps.setString(1, t.getTitle());
        ps.setString(2, t.getArtist());
        ps.setString(3, t.getAlbum());
        ps.setString(4, t.getGenre());
        ps.setString(5, t.getReleaseDate());
        ps.setString(6, t.getDuration());
        ps.setInt(7, t.getId());
        ps.executeUpdate();
    }

     
     @Override
    public void deleteTracks(List<Integer> ids) throws Exception {
//        if (ids == null || ids.isEmpty()) return;

        StringBuilder sql = new StringBuilder("DELETE FROM music WHERE id IN (");
        for (int i = 0; i < ids.size(); i++) {
            sql.append("?");
            if (i < ids.size() - 1) {
                sql.append(",");
            }
        }
        sql.append(")");

        try (Connection conn = DBUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < ids.size(); i++) {
                ps.setInt(i + 1, ids.get(i));
            }

            ps.executeUpdate();
//            int rowsDeleted = ps.executeUpdate();
//            System.out.println("Rows deleted: " + rowsDeleted);
        }
    }

    @Override
     public void deleteTrack(int id) throws Exception {
        PreparedStatement ps = conn.prepareStatement("DELETE FROM music WHERE id=?");
        ps.setInt(1, id);
        ps.executeUpdate();
    }

}
