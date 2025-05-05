/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Controller;

import com.opalmp3.Dao.musicDAO.TrackDAO;
import com.opalmp3.Model.Track;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author avinashpandey
 */
@Controller
public class TrackController {
    
    @Autowired
    private TrackDAO trackDAO;

//    // Gett All Values
//    @RequestMapping(value = "/getAllTracks", method = RequestMethod.GET)
//    @ResponseBody
//    public List<Track> getAllTracks() {
//        try {
//            return trackDAO.getAllTracks();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }

    
    // Get All music values including pagination
    
@RequestMapping(value = "/getAllTracks")
@ResponseBody
public ResponseEntity<Map<String, Object>> getAllTracks(@RequestParam(value = "start", defaultValue = "0") int page,
        @RequestParam(value = "limit", defaultValue = "25") int limit,
        @RequestParam(value = "sortColumn", defaultValue = "id") String sortColumn,
        @RequestParam(value = "dir", defaultValue = "DESC") String sortOrder,
        @RequestParam(value = "sort", defaultValue = "id") String sort){
    Map<String, Object> response = new HashMap<>();
    
    try {
        // Fetch paginated tracks
//        List<Track> tracks = trackDAO.getAllTracks(page, limit, sortColumn, sortOrder);

         // 🔥 Validate sortColumn and sortOrder here
        List<String> allowedColumns = Arrays.asList("id", "title", "artist", "album", "genre", "release_date", "duration");
//        if (!allowedColumns.contains(sortColumn)) {
//            sortColumn = "id"; // default safe column
//        }
//
//        if (!sortOrder.equalsIgnoreCase("ASC") && !sortOrder.equalsIgnoreCase("DESC")) {
//            sortOrder = "DESC"; // default safe order
//        }
  // Fetch paginated tracks and total count
        Map<String, Object> result = trackDAO.getAllTracks(page, limit, sort, sortOrder);
        
        // Get the total count of tracks
//        int totalCount = trackDAO.getTotalCount();
        
        // Put results into response map
        response.put("musicList", result.get("musicList"));
        response.put("totalCount",result.get("totalCount"));
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        // Handle error
        e.printStackTrace();
        response.put("error", "Error fetching tracks");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    
//    return ResponseEntity.ok(response);
}

    
    // Add Track
    
    // ✅ Add Track - returns JSON
    @RequestMapping(value = "/addTrack", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addTrack(@RequestBody Track track) {
        Map<String, Object> response = new HashMap<>();
        try {
            trackDAO.addTrack(track);
            response.put("success", true);
            response.put("message", "Music added successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Error adding music.");
        }
        return response;
    }
    
//    @RequestMapping(value = "/addTrack", method = RequestMethod.POST)
//    @ResponseBody
//    public String addTrack(@RequestBody Track track) {
//        try {
//            trackDAO.addTrack(track);
//            return "Track added successfully!";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error adding track.";
//        }
//    }

    // Update Track
    
    
    // ✅ Update Track - returns JSON
    @RequestMapping(value = "/updateTrack", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateTrack(@RequestBody Track track) {
        Map<String, Object> response = new HashMap<>();
        try {
            trackDAO.updateTrack(track);
            response.put("success", true);
            response.put("message", "Music updated successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Error updating music.");
        }
        return response;
    }
    
//    @RequestMapping(value = "/updateTrack", method = RequestMethod.POST)
//    @ResponseBody
//    public String updateTrack(@RequestBody Track track) {
//        try {
//            trackDAO.updateTrack(track);
//            return "Track updated successfully!";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error updating track.";
//        }
//    }

    // delete Track
    
    // ✅ Delete Track - returns JSON
    @RequestMapping(value = "/deleteTrack", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteTrack(@RequestBody Map<String, List<Integer>> requestData) {
        Map<String, Object> response = new HashMap<>();
        List<Integer> ids = requestData.get("ids");
        try {
            trackDAO.deleteTracks(ids);
//            for(int id : ids){
//            trackDAO.deleteTrack(ids);
//            }
            response.put("success", true);
            response.put("message", "Music deleted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Error deleting music.");
        }
        return response;
    }
    
//    @RequestMapping(value = "/deleteTrack", method = RequestMethod.POST)
//    @ResponseBody
//    public String deleteTrack(@RequestParam("id") int id) {
//        try {
//            trackDAO.deleteTrack(id);
//            return "Track deleted successfully!";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error deleting track.";
//        }
//    }
}
