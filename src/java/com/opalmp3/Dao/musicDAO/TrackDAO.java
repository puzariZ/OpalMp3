package com.opalmp3.Dao.musicDAO;

import com.opalmp3.Model.Track;
import java.util.List;
import java.util.Map;

public interface TrackDAO {
//    List<Track> getAllTracks() throws Exception;
    void addTrack(Track t) throws Exception;
    void updateTrack(Track t) throws Exception;
    void deleteTracks(List<Integer> ids) throws Exception;
    void deleteTrack(int id) throws Exception;

    public Map<String, Object> getAllTracks(int Start, int limit, String sortColumn, String sortOrder) throws Exception;

//    public int getTotalCount() throws Exception;
}
