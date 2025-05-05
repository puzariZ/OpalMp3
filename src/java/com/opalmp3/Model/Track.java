/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.opalmp3.Model;

/**
 *
 * @author avinashpandey
 */
public class Track {
    private int id;
    private String title;
    private String artist;
    private String album;
    private String genre;
    private String releaseDate; // (format: yyyy-MM-dd)
    private String duration;
    
    // Getters and setters
    
    public Track(){}
    
    public Track(int id, String title, String artist, String album, String genre, String releaseDate, String duration){
        this.id = id;
        this.title= title;
        this.artist = artist;
        this.album = album;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.duration = duration;
    }
    
    public int getId(){
        return id;
    }
    
    public void setId(int id){
        this.id = id;
    }
    
      public String getTitle(){
        return title;
    }
    
    public void setTitle(String title){
        this.title = title;
    }
    
    
    public String getArtist(){
        return artist;
    }
    
    public void setArtist(String artist){
        this.artist = artist;
    }
    
    public String getAlbum(){
          return album; 
    }
    
    public void setAlbum(String album) {
        this.album = album;
    }
//    
    public String getGenre(){
        return genre;
    }
    
    public void setGenre(String genre){
        this.genre = genre;
    }
    
    public String getReleaseDate(){
        return releaseDate;
    }
    
    public void setReleaseDate( String releaseDate){
        this.releaseDate = releaseDate;
    }
    
    public String getDuration(){
        return duration;
    }
    
    public void setDuration( String duration){
        this.duration = duration;
    }
    
}
